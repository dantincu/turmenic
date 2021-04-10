import path from "path";

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
import { CopyTsFiles } from "../ms-ts-compiler-api/copy-ts-files.js";

export class CopySourceFiles extends CopySourceFilesBase<CopySourceFilesOpts> {
  constructor(opts: CopySourceFilesOpts) {
    super(opts);
  }

  getAllSourceFilesOpts(): GetDirEntryOpts {
    const opts = super.getAllSourceFilesOpts();
    opts.exceptFilesWithExt = ["ts"];

    return opts;
  }
}

export class CheckSourceFolderForConflicts {
  conflicts: SourceFileConflict[];

  destDirPath: string;
  devDirPath: string;

  metadataFilePath: string;
  conflictsFilePath: string;

  constructor(destDirPath: string) {
    this.conflicts = [];

    this.destDirPath = destDirPath;
    this.devDirPath = path.join(this.destDirPath, DEV_DIR_NAME);

    this.metadataFilePath = path.join(this.devDirPath, METADATA_FILE_NAME);
    this.conflictsFilePath = path.join(this.devDirPath, CONFLICTS_FILE_NAME);
  }

  public async checkForConflicts(): Promise<SourceFileConflict[]> {
    this.assureDevFolder();
    const previousMetadataArr = await this.getPreviousMetadata();

    await forEachAsync(previousMetadataArr, async (val) => {
      await this.checkFileForConflicts(val);
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
    let conflict: SourceFileConflict | null = null;

    const filePath = path.join(this.devDirPath, prevMetadata.relPath);
    const text = await readFileIfExists(filePath);

    if (text) {
      const hash = getStrMd5Hash(text);

      if (hash !== prevMetadata.hash) {
        conflict = {
          currentHash: hash,
          previousHash: prevMetadata.hash,
          relPath: prevMetadata.relPath,
          lastModifiedDate: await getFileLastModifiedTime(filePath),
        };

        this.conflicts.push(conflict);
      }
    }

    return conflict;
  }

  async getPreviousMetadata() {
    const previousMetadata: SourceFileMetadata[] = await loadJsonFromFileOrDefault(
      this.metadataFilePath,
      []
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
}

export class CopySourceFolders {
  opts: CopySourceFoldersOpts;

  constructor(opts: CopySourceFoldersOpts) {
    this.opts = opts;
  }

  public async copyFolders(): Promise<boolean> {
    let success =
      (await this.checkForConflicts()) && (await this.createDestTempDirs());

    if (success) {
      await forEachAsync(this.opts.srcDirNames, async (srcDirName) => {
        if (success) {
          success = await this.copyFolder(srcDirName);
        }
      });
    }

    if (success) {
      await forEachAsync(this.opts.srcDirNames, async (srcDirName) => {
        const destTempDirPath = this.getDestDirPath(srcDirName, true);
        const destDirPath = this.getDestDirPath(srcDirName, false);

        await removeDirIfExists(destDirPath);
        await renameAsync(destTempDirPath, destDirPath);
      });
    }

    return success;
  }

  async copyFolder(srcDirName: string): Promise<boolean> {
    const destTempDirName = `${srcDirName}.${TEMP_DIR_NAME_SUFFIX}`;
    await this.cloneSrcFolderHierarchy(srcDirName);

    const dirMetadata: DirMetadata = {
      tsFilesMetadata: await this.copyTsFiles(srcDirName, destTempDirName),
      filesMetadata: await this.copyNonTsFiles(srcDirName, destTempDirName),
      timeStamp: new Date(),
    };

    const json = JSON.stringify(dirMetadata);

    const filePath = path.join(
      this.opts.destDirBasePath,
      destTempDirName,
      DEV_DIR_NAME,
      METADATA_FILE_NAME
    );

    await writeFileAsync(filePath, json);
    return true;
  }

  async cloneSrcFolderHierarchy(srcDirName: string) {
    const srcDirPath = path.join(this.opts.srcDirBasePath, srcDirName);
    const destTempDirPath = this.getDestDirPath(srcDirName, true);

    await cloneDirHierarchy(srcDirPath, destTempDirPath);
  }

  async copyTsFiles(
    srcDirName: string,
    destTempDirName: string
  ): Promise<SourceFileMetadata[]> {
    const opts = this.getCopyTsFilesOpts(srcDirName, destTempDirName);
    const engine = new CopyTsFiles(opts);

    const metadataArr = await engine.copyFiles();
    return metadataArr;
  }

  async copyNonTsFiles(
    srcDirName: string,
    destTempDirName: string
  ): Promise<SourceFileMetadata[]> {
    const opts = this.getCopyFilesOpts(srcDirName, destTempDirName);
    const engine = new CopySourceFiles(opts);

    const metadataArr = await engine.copyFiles();
    return metadataArr;
  }

  getCopyFilesOpts(
    srcDirName: string,
    destTempDirName: string
  ): CopySourceFilesOpts {
    const opts: CopySourceFilesOpts = {
      destDirBasePath: this.opts.destDirBasePath,
      srcDirBasePath: this.opts.srcDirBasePath,
      srcDirName: srcDirName,
      destDirName: destTempDirName,
    };

    return opts;
  }

  getCopyTsFilesOpts(srcDirName: string, destTempDirName: string) {
    const opts = this.getCopyFilesOpts(
      srcDirName,
      destTempDirName
    ) as CopyTsFilesOpts;

    opts.stripTsImportsOfJsExt = true;
    return opts;
  }

  async checkForConflicts(): Promise<boolean> {
    let noConflicts = true;

    await forEachAsync(this.opts.srcDirNames, async (srcDirName) => {
      if (noConflicts) {
        const conflictsCheckup = new CheckSourceFolderForConflicts(
          this.getDestDirPath(srcDirName, false)
        );

        const conflicts = await conflictsCheckup.checkForConflicts();

        if (conflicts.length > 0) {
          noConflicts = false;

          console.log(
            "Could not copy source folders because there are file conflicts",
            conflicts
          );
        }
      }
    });

    return noConflicts;
  }

  async createDestTempDirs(): Promise<boolean> {
    let noConflicts = true;

    await forEachAsync(this.opts.srcDirNames, async (srcDirName) => {
      const destTempDirPath = this.getDestDirPath(srcDirName, true);

      if (await tryCreateNewDir(destTempDirPath)) {
        console.log(
          `Destination temp folder ${destTempDirPath} already exists`
        );
        noConflicts = false;
      } else {
        const destTempDevDirPath = path.join(destTempDirPath, DEV_DIR_NAME);

        if (await tryCreateNewDir(destTempDevDirPath)) {
          console.log(
            `Destination temp dev folder ${destTempDevDirPath} already exists`
          );
          noConflicts = false;
        }
      }
    });

    return noConflicts;
  }

  getDestDirPath(srcDirName: string, isTemp: boolean) {
    const destDirName = isTemp
      ? `${srcDirName}.${TEMP_DIR_NAME_SUFFIX}`
      : srcDirName;

    const destDirPath = path.join(this.opts.destDirBasePath, destDirName);
    return destDirPath;
  }
}
