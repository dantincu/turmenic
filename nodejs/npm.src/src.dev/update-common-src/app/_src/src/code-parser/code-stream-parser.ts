import { isBasicNewLineChar } from "../../src.common/text/new-line.js";
import {
  CodeCharType,
  CodeSyntaxError,
  CodeFragment,
  BasicCodeFragment,
  isAllWhiteSpace,
  endsWithWhiteSpace,
  containsNewLine,
  assureInputCharIsValid,
} from "./code-parser.base.js";

export class CodeStreamParser {
  rawCode: string;
  basicCodeFragments: BasicCodeFragment[];
  currentBasicFragment: BasicCodeFragment | null;
  isEndOfLine: boolean;

  constructor() {
    this.rawCode = "";
    this.basicCodeFragments = [];
    this.currentBasicFragment = null;
    this.isEndOfLine = false;
  }

  public charReceived(char: string): boolean {
    const isEndOfLine = isBasicNewLineChar(char);
    assureInputCharIsValid(char);
    const isWhiteSpace = isAllWhiteSpace(char);

    if (!!this.currentBasicFragment) {
      this.createNewFragment(char, isWhiteSpace, isEndOfLine);
    } else {
      if (this.isEndOfLine === true) {
        this.createNewFragment(char, isWhiteSpace, isEndOfLine);
      } else if (
        isAllWhiteSpace(char) !==
        endsWithWhiteSpace(this.getCode())
      ) {
        if (isEndOfLine) {
          this.addChar(char);
        } else {
          this.createNewFragment(char, isWhiteSpace, isEndOfLine);
        }
      } else {
        this.addChar(char);
      }
    }

    this.rawCode += char;
    this.isEndOfLine = isEndOfLine;

    return isEndOfLine;
  }

  addChar(char: string) {
    if (this.currentBasicFragment) {
      this.currentBasicFragment.code += char;
    } else {
      throw new Error(
        "Something went wrong; this.currentBasicFragment is null, but it should not be null."
      );
    }
  }

  getCode() {
    const code = this.currentBasicFragment
      ? this.currentBasicFragment.code
      : "";

    return code;
  }

  createNewFragment(char: string, isWhiteSpace: boolean, isEndOfLine: boolean) {
    let appendToPrev = false;

    if (this.currentBasicFragment) {
      const currentCode = this.currentBasicFragment.code;

      if (
        char === "\n" &&
        currentCode.length > 0 &&
        currentCode[currentCode.length - 1] === "\r"
      ) {
        appendToPrev = true;
        this.currentBasicFragment.code += char;
      }

      this.basicCodeFragments.push(this.currentBasicFragment);
    }

    this.currentBasicFragment = {
      code: appendToPrev ? "" : char,
    };

    if (isWhiteSpace) {
      this.currentBasicFragment.isWhiteSpace = isWhiteSpace;
    }

    if (isEndOfLine && appendToPrev === false) {
      this.currentBasicFragment.isEndOfLine = true;
    }
  }
}
