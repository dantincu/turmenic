import path from "path";

import { appConsole } from "../../src.common/logging/appConsole.js";

import {
  GetDirEntryOpts,
  writeFileAsync,
  renameAsync,
} from "../../src.node.common/fileSystem/types.js";

import {
  tryCreateNewDir,
  removeDirIfExists,
} from "../../src.node.common/fileSystem/fileSystem.js";

import { cloneDirHierarchy } from "../../src.node.common/fileSystem/cloneHierarchy.js";

import { getDirEntries } from "../../src.node.common/fileSystem/getDirEntries.js";

import { GenericHash, strArrToHash } from "../../src.common/utils/types.js";
import { forEachAsync } from "../../src.common/arrays/arrays-async.js";

import {
  DEV_DIR_NAME,
  METADATA_FILE_NAME,
  TEMP_DIR_NAME_SUFFIX,
  CopySourceFilesOpts,
  CopySourceFilesBase,
  CopySourceFoldersOpts,
  CopyTsFilesOpts,
  DirMetadata,
} from "./source-code.js";
import {
  CopyTsFiles,
  getSourceFileText,
} from "../ms-ts-compiler-api/copy-ts-files.js";

import { CheckSourceFolderForConflicts } from "./conflicts.js";
import {
  FolderTsPrograms,
  TsProgram,
  TsProgramOpts,
  normalizeOpts,
} from "../ms-ts-compiler-api/tsProgram.js";

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

export interface SourceFolderData {
  destTempDirName: string;
  cpFsEngine: CopySourceFiles;
  cpTsFsEngine: CopyTsFiles;
}

export class CopySourceFolders {
  opts: CopySourceFoldersOpts;

  tsPrograms: FolderTsPrograms;
  srcFoldersData: GenericHash<SourceFolderData>;

  constructor(opts: CopySourceFoldersOpts) {
    this.opts = opts;
    this.tsPrograms = new FolderTsPrograms();
    this.srcFoldersData = this.getSourceFoldersData(opts);
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
    const srcFolderItem = this.srcFoldersData[srcDirName];
    await this.cloneSrcFolderHierarchy(srcDirName);

    const dirMetadata: DirMetadata = {
      tsFilesMetadata: await srcFolderItem.cpTsFsEngine.copyFiles(),
      filesMetadata: await srcFolderItem.cpFsEngine.copyFiles(),
      timeStamp: new Date(),
    };

    const json = JSON.stringify(dirMetadata);

    const filePath = path.join(
      this.opts.destDirBasePath,
      srcFolderItem.destTempDirName,
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

  getCopyFilesOpts(
    srcDirName: string,
    destTempDirName: string
  ): CopySourceFilesOpts {
    const opts: CopySourceFilesOpts = {
      tsPrograms: this.tsPrograms,
      destDirBasePath: this.opts.destDirBasePath,
      srcDirBasePath: this.opts.srcDirBasePath,
      srcDirName: srcDirName,
      destDirName: destTempDirName,
      newLineStr: this.opts.newLineStr,
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

    if (this.opts.ignoreConflicts !== true) {
      await forEachAsync(this.opts.srcDirNames, async (srcDirName) => {
        if (noConflicts) {
          const conflictsCheckup = new CheckSourceFolderForConflicts({
            tsPrograms: this.tsPrograms,
            destDirPath: this.getDestDirPath(srcDirName, false),
            srcDirPath: path.join(this.opts.srcDirBasePath, srcDirName),
          });

          const conflicts = await conflictsCheckup.checkForConflicts();

          if (conflicts.length > 0) {
            noConflicts = false;

            appConsole.log(
              "Could not copy source folders because there are file conflicts",
              conflicts
            );
          }
        }
      });
    }
    return noConflicts;
  }

  async createDestTempDirs(): Promise<boolean> {
    let noConflicts = true;

    await forEachAsync(this.opts.srcDirNames, async (srcDirName) => {
      const destTempDirPath = this.getDestDirPath(srcDirName, true);

      if (await tryCreateNewDir(destTempDirPath)) {
        appConsole.log(
          `Destination temp folder ${destTempDirPath} already exists`
        );
        noConflicts = false;
      } else {
        const destTempDevDirPath = path.join(destTempDirPath, DEV_DIR_NAME);

        if (await tryCreateNewDir(destTempDevDirPath)) {
          appConsole.log(
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

  getCpFsEngines(opts: CopySourceFoldersOpts): GenericHash<CopySourceFiles> {
    const cpFsEngines = strArrToHash(opts.srcDirNames, (srcDirName) => {
      const destTempDirName = `${srcDirName}.${TEMP_DIR_NAME_SUFFIX}`;
      const opts = this.getCopyFilesOpts(srcDirName, destTempDirName);

      const engine = new CopySourceFiles(opts);
      return engine;
    });

    return cpFsEngines;
  }

  getCpTsFsEngines(opts: CopySourceFoldersOpts): GenericHash<CopyTsFiles> {
    const cpTsFsEngines = strArrToHash(opts.srcDirNames, (srcDirName) => {
      const destTempDirName = `${srcDirName}.${TEMP_DIR_NAME_SUFFIX}`;
      const opts = this.getCopyTsFilesOpts(srcDirName, destTempDirName);

      const engine = new CopyTsFiles(opts);
      return engine;
    });

    return cpTsFsEngines;
  }

  getSourceFoldersData(
    opts: CopySourceFoldersOpts
  ): GenericHash<SourceFolderData> {
    const dataArr: GenericHash<SourceFolderData> = strArrToHash(
      opts.srcDirNames,
      (srcDirName) => {
        const destTempDirName = `${srcDirName}.${TEMP_DIR_NAME_SUFFIX}`;

        const data = {
          destTempDirName: destTempDirName,
          cpFsEngine: new CopySourceFiles(
            this.getCopyFilesOpts(srcDirName, destTempDirName)
          ),
          cpTsFsEngine: new CopyTsFiles(
            this.getCopyTsFilesOpts(srcDirName, destTempDirName)
          ),
        } as SourceFolderData;

        return data;
      }
    );

    return dataArr;
  }
}
