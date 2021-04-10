import path from "path";

import { getStrMd5Hash } from "../../src.node.common/crypto/crypto.js";

import {
  writeFileAsync,
  readFileAsync,
  GetDirEntryOpts,
} from "../../src.node.common/fileSystem/types.js";
import { getDirEntries } from "../../src.node.common/fileSystem/getDirEntries.js";
import { getFileLastModifiedTime } from "../../src.node.common/fileSystem/fileSystem.js";

import {
  mapAsync,
  forEachAsync,
} from "../../src.common/arrays/arrays-async.js";

import { strReplaceEndsWith } from "../../src.common/text/utils.js";
import { getRelPath } from "../../src.node.common/fileSystem/path.js";

export const TEMP_DIR_NAME_SUFFIX = "__TEMP__";
export const DEV_DIR_NAME = "__DEV__";
export const METADATA_FILE_NAME = "metadata.json";
export const CONFLICTS_FILE_NAME = "conflicts.json";

export interface CopySourceOptsBase {
  srcDirBasePath: string;
  destDirBasePath: string;
}

export interface CopySourceFoldersOpts extends CopySourceOptsBase {
  srcDirNames: string[];
}

export interface CopySourceFilesOptsBase extends CopySourceOptsBase {
  srcDirName: string;
  destDirName: string;
}

export interface CopySourceFilesOpts extends CopySourceFilesOptsBase {}

export interface CopyTsFilesOpts extends CopySourceFilesOptsBase {
  stripTsImportsOfJsExt: boolean; // my server side app's import statements for typescript files end with .js extension. They only work this way as I could not
  // find a way to tell tsc to add the extension automatically for output files. But this is an issue with react apps, which require ts file import statements to
  // not have the extension provided (even more so as the extension is .js, instead of .ts, but it doesn't work with .ts either)
}

export interface SourceFileMetadata {
  relPath: string;
  hash: string;
}

export interface SourceFileConflict {
  relPath: string;
  currentHash: string;
  previousHash: string;
  lastModifiedDate: Date;
}

export interface JsonDataBase {
  timeStamp: Date;
}

export interface DirMetadata extends JsonDataBase {
  filesMetadata: SourceFileMetadata[];
  tsFilesMetadata: SourceFileMetadata[];
}

export interface DirConflicts extends JsonDataBase {
  conflicts: SourceFileConflict[];
}

export class CopySourceFilesBase<TOptions extends CopySourceFilesOptsBase> {
  opts: TOptions;

  allSrcFiles: string[];
  filesMetadata: SourceFileMetadata[];

  srcDirBasePath: string;
  destDirBasePath: string;

  constructor(opts: TOptions) {
    this.opts = opts;

    this.allSrcFiles = [];
    this.filesMetadata = [];

    this.srcDirBasePath = path.join(
      this.opts.srcDirBasePath,
      this.opts.srcDirName
    );

    this.destDirBasePath = path.join(
      this.opts.destDirBasePath,
      this.opts.destDirName
    );
  }

  public async copyFiles() {
    this.allSrcFiles = await this.getAllSourceFiles();

    await forEachAsync(this.allSrcFiles, async (val) => {
      const metadata = await this.copyFile(val);
      this.filesMetadata.push(metadata);
    });

    return this.filesMetadata;
  }

  async copyFile(srcFilePath: string) {
    const outputText = await this.getOutputText(srcFilePath);

    const retVal: SourceFileMetadata = {
      relPath: getRelPath(srcFilePath, this.srcDirBasePath),
      hash: getStrMd5Hash(outputText),
    };

    const filePath = path.join(this.destDirBasePath, retVal.relPath);
    await writeFileAsync(filePath, outputText);

    return retVal;
  }

  async getOutputText(srcFilePath: string) {
    const outputText = (await readFileAsync(srcFilePath)).toString("utf-8");
    return outputText;
  }

  async getAllSourceFiles() {
    const allSrcFiles = await getDirEntries(
      this.srcDirBasePath,
      this.getAllSourceFilesOpts()
    );

    return allSrcFiles;
  }

  getAllSourceFilesOpts(): GetDirEntryOpts {
    const opts: GetDirEntryOpts = {
      onlyFiles: true,
      recursive: true,
    };

    return opts;
  }
}
