import { hasValue } from "../../src.common/utils/types.js";

import {
  CodeCharType,
  CodeSyntaxError,
  CodeFragment,
} from "./code-parser.base.js";

export class CodeParser {
  readonly specialSymbolsHash: { [key: string]: CodeCharType };
  readonly parensHash: { [key: string]: CodeCharType };

  sourceCode: string;

  codeFragments: CodeFragment[];
  currentCodeCharArr: string[];
  currentCodeCharType: CodeCharType;

  constructor() {
    this.specialSymbolsHash = this.getSpecialSymbolsHash();
    this.parensHash = this.getParensHash();

    this.sourceCode = "";
    this.codeFragments = [];
    this.currentCodeCharArr = [];
    this.currentCodeCharType = CodeCharType.none;
  }

  public parse(sourceCode: string): CodeFragment[] {
    sourceCode = this.prepParse(sourceCode);

    if (this.tryHandleEmptySourceCode(sourceCode) === false) {
      for (let i = 0; i < sourceCode.length; i++) {
        let char = sourceCode[i];
        let codeCharType = this.getCodeCharType(char);

        if (
          [
            CodeCharType.whiteSpace,
            CodeCharType.word,
            CodeCharType.digit,
            CodeCharType.operatorSymbol,
          ].indexOf(codeCharType) >= 0
        ) {
          if (this.currentCodeCharType === codeCharType) {
            this.currentCodeCharArr.push(char);
          } else {
            this.flushCurrentCodeCharArr(char, codeCharType);
          }
        } else {
          this.flushCurrentCodeCharArr(char, codeCharType);
        }
      }
    }

    return this.codeFragments;
  }

  flushCurrentCodeCharArr(char: string, codeCharType: CodeCharType) {
    if (this.currentCodeCharType !== CodeCharType.none) {
      this.codeFragments.push(this.getNextCodeFragment(char, codeCharType));
    }

    this.currentCodeCharArr = [char];
    this.currentCodeCharType = codeCharType;
  }

  getNextCodeFragment(char: string, codeCharType: CodeCharType) {
    const codeFragment = {
      code: this.currentCodeCharArr.join(),
      charsType: this.currentCodeCharType,
      succededByWhiteSpace: codeCharType === CodeCharType.whiteSpace,
    } as CodeFragment;

    if (this.codeFragments.length > 0) {
      codeFragment.precededByWhiteSpace =
        this.codeFragments[this.codeFragments.length - 1].charsType ===
        CodeCharType.whiteSpace;
    }

    return codeFragment;
  }

  getCodeCharType(char?: string | null | undefined): CodeCharType {
    let codeCharType: CodeCharType = CodeCharType.none;

    if (typeof char === "string") {
      if (char.match(/\s/g)) {
        codeCharType = CodeCharType.whiteSpace;
      } else if (char.match(/\d/g)) {
        codeCharType = CodeCharType.digit;
      } else if (CodeCharType.operatorSymbol.indexOf(char) >= 0) {
        codeCharType = CodeCharType.operatorSymbol;
      } else {
        const specialSymbolType = this.getSpecialSymbolOrParenType(char);

        if (specialSymbolType !== CodeCharType.none) {
          codeCharType = specialSymbolType;
        } else {
          codeCharType = CodeCharType.word;
        }
      }
    }

    return codeCharType;
  }

  tryHandleEmptySourceCode(sourceCode: string) {
    let retVal: boolean = false;

    if (sourceCode.length < 1) {
      retVal = true;
      const codeChar = sourceCode[0];

      this.codeFragments.push({
        code: codeChar,
        charsType: this.getCodeCharType(codeChar),
      });
    }

    return retVal;
  }

  getSpecialSymbolType(
    char: string,
    specialSymbolsHash: { [key: string]: CodeCharType }
  ) {
    let codeCharType: CodeCharType = CodeCharType.none;

    for (let [key, val] of Object.entries(specialSymbolsHash)) {
      if (key === char) {
        codeCharType = val;
      }
    }

    return codeCharType;
  }

  getSpecialSymbolOrParenType(char: string) {
    let codeCharType = this.getSpecialSymbolType(char, this.specialSymbolsHash);

    if (codeCharType === CodeCharType.none) {
      codeCharType = this.getSpecialSymbolType(char, this.parensHash);
    }

    return codeCharType;
  }

  prepParse(sourceCode: string) {
    this.reset();

    this.sourceCode = sourceCode ?? "";
    return this.sourceCode;
  }

  reset() {
    this.sourceCode = "";
    this.codeFragments = [];
    this.currentCodeCharArr = [];
    this.currentCodeCharType = CodeCharType.none;
  }

  getSpecialSymbolsHash(): { [key: string]: CodeCharType } {
    let specialSymbolsHash: { [key: string]: CodeCharType } = {};

    specialSymbolsHash[CodeCharType.backSlash] = CodeCharType.backSlash;
    specialSymbolsHash[CodeCharType.fwdSlash] = CodeCharType.fwdSlash;
    specialSymbolsHash[CodeCharType.sQuote] = CodeCharType.sQuote;
    specialSymbolsHash[CodeCharType.dQuote] = CodeCharType.dQuote;
    specialSymbolsHash[CodeCharType.mlQuote] = CodeCharType.mlQuote;

    specialSymbolsHash = Object.freeze(specialSymbolsHash);
    return specialSymbolsHash;
  }

  getParensHash(): { [key: string]: CodeCharType } {
    let parensHash: { [key: string]: CodeCharType } = {};

    this.addSpecialSymbolsToHash(parensHash, CodeCharType.curlyBracket);
    this.addSpecialSymbolsToHash(parensHash, CodeCharType.squareBracket);

    this.addSpecialSymbolsToHash(parensHash, CodeCharType.roundBracket);
    this.addSpecialSymbolsToHash(parensHash, CodeCharType.angularBracket);

    parensHash = Object.freeze(parensHash);
    return parensHash;
  }

  addSpecialSymbolsToHash(
    specialSymbolsHash: { [key: string]: CodeCharType },
    codeCharType: CodeCharType
  ) {
    for (let i = 0; i < codeCharType.length; i++) {
      specialSymbolsHash[codeCharType[i]] = codeCharType;
    }
  }
}

export class MultilineCodeParser extends CodeParser {
  lineParser: CodeParser;

  constructor() {
    super();

    this.lineParser = new CodeParser();
  }

  public parse(sourceCode: string): CodeFragment[] {
    sourceCode = this.prepParse(sourceCode);
    const lines = sourceCode.split("\n");

    const codeFragments: CodeFragment[] = lines
      .map((line, idx, arr) => {
        const codeFrgArr = this.lineParser.parse(line);

        if (codeFrgArr.length > 0) {
          this.markLine(codeFrgArr, idx, arr);
          this.markFirstOfNewLine(codeFrgArr);
          this.markLastOfLine(codeFrgArr);
        }

        return codeFrgArr;
      })
      .flat();

    this.codeFragments = codeFragments;
    return codeFragments;
  }

  markFirstOfNewLine(codeFrgArr: CodeFragment[]) {
    let markedFirstOfNewLine = false;

    for (let i = 0; i < codeFrgArr.length; i++) {
      const codeFrg = codeFrgArr[i];
      if (codeFrg.charsType !== CodeCharType.whiteSpace) {
        codeFrg.isFirstOfNewLine = true;
        break;
      }
    }

    return markedFirstOfNewLine;
  }

  markLastOfLine(codeFrgArr: CodeFragment[]) {
    let markedLastOfLine = false;

    for (let i = codeFrgArr.length - 1; i >= 0; i--) {
      const codeFrg = codeFrgArr[i];
      if (codeFrg.charsType !== CodeCharType.whiteSpace) {
        codeFrg.isLastOfLine = true;
        break;
      }
    }

    return markedLastOfLine;
  }

  markLine(codeFrgArr: CodeFragment[], lineIdx: number, linesArr: string[]) {
    codeFrgArr[0].isNewLine = true;
    codeFrgArr[codeFrgArr.length - 1].isEndOfLine = true;

    if (lineIdx === 0) {
      codeFrgArr[0].isFirstLine = true;
    } else if (lineIdx === linesArr.length - 1) {
      codeFrgArr[codeFrgArr.length - 1].isLastLine = true;
    }
  }
}
