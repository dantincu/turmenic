import path from "path";
import ts from "typescript";

import { getStrMd5Hash } from "../../src.node.common/crypto/crypto.js";

import {
  GetDirEntryOpts,
  mkdirAsync,
  writeFileAsync,
  rmdirAsync,
  renameAsync,
  readdirAsync,
} from "../../src.node.common/fileSystem/types.js";

import {
  readFileIfExists,
  getFileLastModifiedTime,
  tryCreateNewDir,
  removeDirIfExists,
} from "../../src.node.common/fileSystem/fileSystem.js";

import { cloneDirHierarchy } from "../../src.node.common/fileSystem/cloneHierarchy.js";

import { loadJsonFromFileOrDefault } from "../../src.node.common/fileSystem/json.js";
import {
  getDirEntries,
  tryGetDirEntries,
} from "../../src.node.common/fileSystem/getDirEntries.js";

import { GenericHash, strArrToHash } from "../../src.common/utils/types.js";
import { forEachAsync } from "../../src.common/arrays/arrays-async.js";

import {
  DEV_DIR_NAME,
  CONFLICTS_FILE_NAME,
  METADATA_FILE_NAME,
  TEMP_DIR_NAME_SUFFIX,
  CopySourceFilesOpts,
  CopySourceFilesBase,
  CopySourceFoldersOpts,
  CopySourceFilesOptsBase,
  CopySourceOptsBase,
  CopyTsFilesOpts,
  DirMetadata,
  SourceFileMetadata,
  SourceFileConflict,
  DirConflicts,
} from "./source-code.js";
import {
  CopyTsFiles,
  getSourceFileText,
} from "../ms-ts-compiler-api/copy-ts-files.js";

export interface ConflictsCheckupOpts {
  destDirPath: string;
  srcDirPath: string;
}

export interface TsFilesData {
  tsDirPath: string;
  tsProgram: ts.Program;
  tsFiles: string[];
}

export class CheckSourceFolderForConflicts {
  opts: ConflictsCheckupOpts;
  conflicts: SourceFileConflict[];

  destDirPath: string;
  devDirPath: string;

  metadataFilePath: string;
  conflictsFilePath: string;

  destTsFilesData: TsFilesData | null;
  srcTsFilesData: TsFilesData | null;

  constructor(opts: ConflictsCheckupOpts) {
    this.opts = opts;
    this.conflicts = [];

    this.destDirPath = opts.destDirPath;
    this.devDirPath = path.join(this.destDirPath, DEV_DIR_NAME);

    this.metadataFilePath = path.join(this.devDirPath, METADATA_FILE_NAME);
    this.conflictsFilePath = path.join(this.devDirPath, CONFLICTS_FILE_NAME);

    this.destTsFilesData = null;
    this.srcTsFilesData = null;
  }

  public async checkForConflicts(): Promise<SourceFileConflict[]> {
    this.assureDevFolder();
    const previousMetadata = await this.getPreviousMetadata();

    await forEachAsync(previousMetadata.filesMetadata, async (val) => {
      await this.checkFileForConflicts(val);
    });

    await forEachAsync(previousMetadata.tsFilesMetadata, async (val) => {
      await this.checkTsFileForConflicts(val);
    });

    await this.writeConflictsToJsonFile();
    return this.conflicts;
  }

  async writeConflictsToJsonFile() {
    if (this.conflicts.length > 0) {
      const jsonData: DirConflicts = {
        conflicts: this.conflicts,
        timeStamp: new Date(),
      };

      const json = JSON.stringify(jsonData);
      await writeFileAsync(this.conflictsFilePath, json);
    }
  }

  async checkFileForConflicts(
    prevMetadata: SourceFileMetadata
  ): Promise<SourceFileConflict | null> {
    let conflict = this.checkFileForConflictsCore(prevMetadata);
    return conflict;
  }

  async checkTsFileForConflicts(
    prevMetadata: SourceFileMetadata
  ): Promise<SourceFileConflict | null> {
    let conflict = await this.checkFileForConflictsCore(
      prevMetadata,
      async (relFilePath: string, fileContent: string): Promise<boolean> => {
        await this.assureTsFilesData();

        const srcFileContent = this.getTsFileContent(
          this.srcTsFilesData as TsFilesData,
          relFilePath
        );

        const distFileContent = this.getTsFileContent(
          this.destTsFilesData as TsFilesData,
          relFilePath
        );

        const isConflict = srcFileContent !== distFileContent;
        return isConflict;
      }
    );

    return conflict;
  }

  getTsFileContent(tsFilesData: TsFilesData, relFilePath: string) {
    const filePath = path.join(tsFilesData.tsDirPath, relFilePath);

    const fileContent = getSourceFileText(
      tsFilesData.tsProgram,
      filePath,
      true
    );

    return fileContent;
  }

  async checkFileForConflictsCore(
    prevMetadata: SourceFileMetadata,
    extraCondition?: (
      relFilePath: string,
      fileContent: string
    ) => Promise<boolean>
  ): Promise<SourceFileConflict | null> {
    let conflict: SourceFileConflict | null = null;

    const filePath = path.join(this.destDirPath, prevMetadata.relPath);
    const text = await readFileIfExists(filePath);

    if (text) {
      const hash = getStrMd5Hash(text);

      if (hash !== prevMetadata.hash) {
        if (
          !extraCondition ||
          (await extraCondition(prevMetadata.relPath, text))
        ) {
          conflict = {
            currentHash: hash,
            previousHash: prevMetadata.hash,
            relPath: prevMetadata.relPath,
            lastModifiedDate: await getFileLastModifiedTime(filePath),
          };

          this.conflicts.push(conflict);
        }
      }
    } else {
    }

    return conflict;
  }

  async getPreviousMetadata(): Promise<DirMetadata> {
    const previousMetadata: DirMetadata = await loadJsonFromFileOrDefault(
      this.metadataFilePath,
      {
        filesMetadata: [],
        tsFilesMetadata: [],
        timeStamp: new Date(0),
      } as DirMetadata
    );

    return previousMetadata;
  }

  async assureDevFolder() {
    let destFolderExists = true;

    const entries = await tryGetDirEntries(this.destDirPath, {
      opts: {
        onlyDirs: true,
      },
      enoentErrorCallback: async (err, entryPath) => {
        destFolderExists = false;
      },
    });

    if (destFolderExists) {
      const entryNames = entries.map((val) => val.name);

      if (entryNames.indexOf(DEV_DIR_NAME) < 0) {
        await mkdirAsync(this.devDirPath);
      }
    }

    return destFolderExists;
  }

  async assureTsFilesData() {
    if (this.srcTsFilesData === null) {
      this.srcTsFilesData = await this.getTsFilesData(this.opts.srcDirPath);
    }

    if (this.destTsFilesData === null) {
      this.destTsFilesData = await this.getTsFilesData(this.opts.destDirPath);
    }
  }

  async getTsFilesData(tsDirPath: string): Promise<TsFilesData> {
    const tsFiles = await getDirEntries(tsDirPath, {
      onlyFiles: true,
      recursive: true,
      onlyFilesWithExt: ["ts"],
    });

    const tsFilesData: TsFilesData = {
      tsDirPath: tsDirPath,
      tsFiles: tsFiles,
      tsProgram: ts.createProgram({
        rootNames: tsFiles,
        options: {
          allowJs: true,
        },
      }),
    };

    return tsFilesData;
  }
}
