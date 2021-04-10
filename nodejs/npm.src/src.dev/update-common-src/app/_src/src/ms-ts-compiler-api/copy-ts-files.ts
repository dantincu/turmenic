import ts from "typescript";
import path from "path";

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

export class CopyTsFiles extends CopySourceFilesBase<CopyTsFilesOpts> {
  program: ts.Program | null;

  constructor(opts: CopyTsFilesOpts) {
    super(opts);
    this.program = null;
  }

  async getOutputText(srcFilePath: string) {
    const sourceFile = this.program?.getSourceFile(
      srcFilePath
    ) as ts.SourceFile;
    const textNodes: string[] = [];

    ts.forEachChild(sourceFile, (node) => {
      textNodes.push(this.getDestNodeText(node, sourceFile));
    });

    const outputText = textNodes.join("\n");
    return outputText;
  }

  getAllSourceFilesOpts(): GetDirEntryOpts {
    const opts = super.getAllSourceFilesOpts();
    opts.onlyFilesWithExt = ["ts"];

    return opts;
  }

  async getAllSourceFiles() {
    const allSrcFiles = await super.getAllSourceFiles();

    this.program = ts.createProgram({
      rootNames: allSrcFiles,
      options: {
        allowJs: true,
      },
    });

    return allSrcFiles;
  }

  getDestNodeText(node: ts.Node, sourceFile: ts.SourceFile) {
    let text = node.getText(sourceFile);
    const replStr = '.js";';
    const replWith = '";';

    if (this.opts.stripTsImportsOfJsExt && ts.isImportDeclaration(node)) {
      text = strReplaceEndsWith(text, replStr, replWith);
    }

    return text;
  }
}
