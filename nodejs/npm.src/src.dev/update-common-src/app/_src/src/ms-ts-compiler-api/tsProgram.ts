import ts from "typescript";
import path from "path";

import { GenericHash } from "../../src.common/utils/types.js";
import { PLATFORM_NEW_LINE } from "../../src.node.common/text/new-line.js";

import { getDirEntries } from "../../src.node.common/fileSystem/getDirEntries.js";
import { strReplaceEndsWith } from "../../src.common/text/utils.js";

export interface TsProgramOpts {
  dirPath: string;
  stripTsImportsOfJsExt?: boolean | null | undefined;
  newLineStr?: string | null | undefined;
}

export class TsProgram {
  opts: TsProgramOpts;

  tsFiles: string[];
  tsProgram: ts.Program | null;

  constructor(opts: TsProgramOpts) {
    this.opts = normalizeOpts(opts);

    this.tsFiles = [];
    this.tsProgram = null;
  }

  public static async create(opts: TsProgramOpts) {
    const tsProgram = new TsProgram(opts);
    await tsProgram.init();

    return tsProgram;
  }

  public async init() {
    this.tsFiles = await this.getTsFiles(this.opts.dirPath);

    this.tsProgram = ts.createProgram({
      rootNames: this.tsFiles,
      options: {
        removeComments: false,
      },
    });
  }

  async getTsFiles(dirPath: string) {
    const tsFiles = await getDirEntries(dirPath, {
      onlyFiles: true,
      recursive: true,
    });

    return tsFiles;
  }

  getSourceFileText(program: ts.Program, srcFilePath: string) {
    const sourceFile = program.getSourceFile(srcFilePath) as ts.SourceFile;
    const textNodes: string[] = [];

    ts.forEachChild(sourceFile, (node) => {
      textNodes.push(this.getDestNodeText(node, sourceFile));
    });

    const outputText = textNodes.join(this.opts.newLineStr as string);
    return outputText;
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

export const normalizeOpts = (opts: TsProgramOpts) => {
  opts.newLineStr = opts.newLineStr ?? PLATFORM_NEW_LINE;
  return opts;
};

export class FolderTsPrograms {
  tsPrograms: GenericHash<TsProgram>;

  constructor() {
    this.tsPrograms = {};
  }

  public async getOrCreate(dirPath: string) {
    dirPath = path.normalize(dirPath);
    let tsProg = this.tsPrograms[dirPath];

    if (!tsProg) {
      tsProg = await TsProgram.create({
        dirPath: dirPath,
        stripTsImportsOfJsExt: true,
      });

      this.tsPrograms[dirPath] = tsProg;
    }

    return tsProg;
  }
}
