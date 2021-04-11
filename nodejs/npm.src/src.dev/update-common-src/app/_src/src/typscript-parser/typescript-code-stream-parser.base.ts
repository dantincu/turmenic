import {
  CodeCharType,
  CodeSyntaxError,
  BasicCodeFragment,
  isAllWhiteSpace,
  endsWithWhiteSpace,
  CodeFragment,
  containsNewLine,
  assureInputCharIsValid,
  DEFAULT_OP_SYMBOLS,
} from "../code-parser/code-parser.base.js";

import {
  TypescriptCodeParserState,
  TsCodeFrag,
  getBlankParserState,
} from "./typescript.js";
import { TypescriptErrorCodes } from "./typescript-syntax-errors.js";
import { isBasicNewLineChar } from "../../src.common/text/new-line.js";
import {
  hexCodeToHtmlChar,
  utf8HexCodes4Digits,
  hexCodeToJsChar,
} from "../../src.common/text/utf8.js";

export interface CharReceivedData {
  char: string;
  isEndOfLine?: boolean | null | undefined;
  isWhiteSpace?: boolean | null | undefined;
}

export interface TestCharsData {
  crntcharData: CharReceivedData;
  crntCharIs: string;
  prevCharIs?: string | null | undefined;
  prevCharIsNot?: string | null | undefined;
  ignoreWhiteSpaces?: boolean | null | undefined;
}

export interface PrevCharData {
  ignoreWhiteSpaces?: boolean | null | undefined;
  stopAtNewLine?: boolean | null | undefined;
  count?: number | null | undefined;
}

export abstract class TypescriptCodeStreamParserBase {
  rawCode: string;
  parserState: TypescriptCodeParserState;

  constructor() {
    this.rawCode = "";
    this.parserState = getBlankParserState();
  }

  public charReceived(char: string) {
    const data = this.getCharData(char);
    const parserState = { ...this.parserState };

    if (parserState.isSlComment) {
      parserState.isSlComment = this.handleSlComment(data);
    } else if (parserState.isMlComment) {
      parserState.isMlComment = this.handleMlComment(data);
    } else if (parserState.isSqStrLit) {
      parserState.isSqStrLit = this.handleSqStrLit(data);
    } else if (parserState.isDqStrLit) {
      parserState.isDqStrLit = this.handleDqStrLit(data);
    } else if (parserState.isMlStrLit) {
      parserState.isMlStrLit = this.handleMlStrLit(data);
    } else if (parserState.isRegexpLit) {
      parserState.isRegexpLit = this.handleRegexpLit(data);
    } else {
      this.handleChar(data, parserState);
    }

    this.rawCode += char;
    this.parserState = parserState;

    return data;
  }

  handleSlComment(data: CharReceivedData): boolean {
    let sameState = data.isEndOfLine !== true;
    return sameState;
  }

  handleMlComment(data: CharReceivedData): boolean {
    let sameState = this.testChars({
      crntcharData: data,
      crntCharIs: "/",
      prevCharIs: "*",
    });

    return sameState;
  }

  handleSqStrLit(data: CharReceivedData): boolean {
    let sameState = this.testChars({
      crntcharData: data,
      crntCharIs: "'",
      prevCharIsNot: "\\",
    });

    return sameState;
  }

  handleDqStrLit(data: CharReceivedData): boolean {
    let sameState = this.testChars({
      crntcharData: data,
      crntCharIs: '"',
      prevCharIsNot: "\\",
    });

    return sameState;
  }

  handleMlStrLit(data: CharReceivedData): boolean {
    let sameState = this.testChars({
      crntcharData: data,
      crntCharIs: "`",
      prevCharIsNot: "\\",
    });

    return sameState;
  }

  handleRegexpLit(data: CharReceivedData): boolean {
    let sameState =
      !!data.isEndOfLine === false &&
      this.testChars({
        crntcharData: data,
        crntCharIs: "/",
        prevCharIsNot: "\\",
      });

    return sameState;
  }

  handleChar(data: CharReceivedData, parserState: TypescriptCodeParserState) {
    const prevChar = this.getPrevChar({ ignoreWhiteSpaces: false });

    if (prevChar === "/") {
      if (data.char === "*") {
        parserState.isMlComment = true;
      } else if (data.char === "/") {
        parserState.isSlComment = true;
      } else {
        const prev2Chars =
          this.getPrevChar({
            ignoreWhiteSpaces: true,
            stopAtNewLine: true,
            count: 2,
          }) ?? "";

        if (
          prev2Chars.length < 2 ||
          `${DEFAULT_OP_SYMBOLS}([{}`.indexOf(prev2Chars[1]) > 0
        ) {
          parserState.isRegexpLit = true;
        } else {
          this.handleCode(data, parserState);
        }
      }
    } else if (data.char === "'" && prevChar !== "\\") {
      parserState.isSqStrLit = true;
    } else if (data.char === '"' && prevChar !== "\\") {
      parserState.isDqStrLit = true;
    } else if (data.char === "`" && prevChar !== "\\") {
      parserState.isMlStrLit = true;
    } else {
      if ("()[]{}".indexOf(data.char) >= 0) {
        this.handleParens(data, parserState);
      } else {
        this.handleCode(data, parserState);
      }
    }
  }

  abstract handleCode(
    data: CharReceivedData,
    parserState: TypescriptCodeParserState
  ): void;

  handleParens(data: CharReceivedData, parserState: TypescriptCodeParserState) {
    if (typeof parserState.parensNotMatchingIdx !== "number") {
      if ("([{".indexOf(data.char) >= 0) {
        parserState.openParens.push(data.char);
      } else if (")]}".indexOf(data.char) >= 0) {
        const openParens = parserState.openParens;
        if (
          openParens.length === 0 ||
          data.char !== openParens[openParens.length - 1]
        ) {
          parserState.parensNotMatchingIdx = this.rawCode.length;
        }
      }
    }
  }

  testChars(data: TestCharsData): boolean {
    let changedState = false;
    let char = data.crntcharData.char;

    if (char === data.crntCharIs) {
      const prevChar =
        this.getPrevChar({
          ignoreWhiteSpaces: data.ignoreWhiteSpaces,
        }) ?? "";

      if (typeof data.prevCharIs === "string") {
        changedState = data.prevCharIs.indexOf(prevChar) >= 0;
      } else if (typeof data.prevCharIsNot === "string") {
        changedState = data.prevCharIsNot.indexOf(prevChar) < 0;
      }
    }

    const sameState = !changedState;
    return sameState;
  }

  getPrevChar(data: PrevCharData) {
    let count = data.count ?? 1;
    let prevChar: string | null = null;
    const code = this.rawCode;

    if (code.length > 0) {
      if (data.ignoreWhiteSpaces) {
        for (let i = code.length - 1; i >= 0; i--) {
          const char = code[i];
          if (!!char.match(/\s/g) === false) {
            prevChar = prevChar ?? "";
            prevChar += char;
            count--;

            if (count === 0) {
              break;
            }
          } else if (data.stopAtNewLine && isBasicNewLineChar(char)) {
            break;
          }
        }
      } else {
        count = Math.min(count, code.length);
        prevChar = code.substring(code.length - count, code.length);
      }
    }

    return prevChar;
  }

  getCharData(char: string) {
    const data = {
      char: char,
    } as CharReceivedData;

    if (isBasicNewLineChar(char)) {
      data.isEndOfLine = true;
    } else {
      assureInputCharIsValid(
        char
      ); /* calling this method AFTER checking for newline because the double char newline string \r\n can also be passed as a single char
      before being converted to 2 chars and this parser should accept this one exception as a valid input char
      */
    }

    if (isAllWhiteSpace(char)) {
      data.isWhiteSpace = true;
    }

    return data;
  }
}
