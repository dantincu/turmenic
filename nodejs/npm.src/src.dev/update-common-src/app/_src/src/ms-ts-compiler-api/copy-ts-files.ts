import path from "path";
import ts from "typescript";

import {
  writeFileAsync,
  GetDirEntryOpts,
} from "../../src.node.common/fileSystem/types.js";
import { getDirEntries } from "../../src.node.common/fileSystem/getDirEntries.js";
import {
  mapAsync,
  forEachAsync,
} from "../../src.common/arrays/arrays-async.js";

import { strReplaceEndsWith } from "../../src.common/text/utils.js";
import { getRelPath } from "../../src.node.common/fileSystem/path.js";

import {
  CopyTsFilesOpts,
  SourceFileMetadata,
  CopySourceFilesBase,
  CopySourceFilesOpts,
  CopySourceFilesOptsBase,
  DirMetadata,
  METADATA_FILE_NAME,
  TEMP_DIR_NAME_SUFFIX,
} from "../source-code/source-code.js";

import {
  FolderTsPrograms,
  TsProgram,
  TsProgramOpts,
  normalizeOpts,
} from "../ms-ts-compiler-api/tsProgram.js";

export class CopyTsFiles extends CopySourceFilesBase<CopyTsFilesOpts> {
  constructor(opts: CopyTsFilesOpts) {
    super(opts);
  }

  public async getOutputText(srcFilePath: string) {
    const outputText = getSourceFileText({
      program: (await this.opts.tsPrograms.getOrCreate(this.srcDirBasePath))
        .tsProgram as ts.Program,
      srcFilePath: srcFilePath,
      stripTsImportsOfJsExt: this.opts.stripTsImportsOfJsExt,
    });

    return outputText;
  }

  getAllSourceFilesOpts(): GetDirEntryOpts {
    const opts = super.getAllSourceFilesOpts();
    opts.onlyFilesWithExt = ["ts"];

    return opts;
  }
}

export interface GetSourceFileTextOpts {
  program: ts.Program;
  srcFilePath: string;
  stripTsImportsOfJsExt: boolean;
}

export const getSourceFileText = (opts: GetSourceFileTextOpts) => {
  const sourceFile = opts.program.getSourceFile(
    opts.srcFilePath
  ) as ts.SourceFile;
  const textNodes: string[] = [];

  ts.forEachChild(sourceFile, (node) => {
    textNodes.push(
      getDestNodeText(node, sourceFile, opts.stripTsImportsOfJsExt)
    );
  });

  const outputText = textNodes.join("");
  return outputText;
};

export const getDestNodeText = (
  node: ts.Node,
  sourceFile: ts.SourceFile,
  stripTsImportsOfJsExt: boolean
) => {
  let text = node.getFullText(sourceFile);
  const replStr = '.js";';
  const replWith = '";';

  if (stripTsImportsOfJsExt && ts.isImportDeclaration(node)) {
    text = strReplaceEndsWith(text, replStr, replWith);
  }

  return text;
};
