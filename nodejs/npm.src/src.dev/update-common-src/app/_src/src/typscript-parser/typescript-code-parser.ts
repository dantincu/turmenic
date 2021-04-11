import {
  CodeCharType,
  CodeSyntaxError,
  CodeFragment,
} from "../code-parser/code-parser.base.js";

import { CodeParser, MultilineCodeParser } from "../code-parser/code-parser.js";

import {
  TypescriptCodeParserState,
  getBlankParserState,
} from "./typescript.js";
import { typescriptErrorCodes } from "./typescript-syntax-errors.js";

export class TypescriptCodeParser extends MultilineCodeParser {
  prevFragment?: CodeFragment | null | undefined;
  currentFragment: CodeFragment;
  nextFragment?: CodeFragment | null | undefined;

  idx: number;

  parserState: TypescriptCodeParserState;

  constructor() {
    super();

    this.currentFragment = this.getBlankCodeFragment();
    this.idx = -1;

    this.parserState = getBlankParserState();
  }

  public parse(sourceCode: string): CodeFragment[] {
    super.parse(sourceCode);

    while (this.idx < this.codeFragments.length) {
      this.idx++;

      this.currentFragment = this.codeFragments[this.idx];
      const codeCharType = this.currentFragment.charsType;

      this.prevFragment = this.getNextFragment(true, true);
      this.nextFragment = this.getNextFragment(true, false);

      if (this.idx < this.codeFragments.length - 1) {
        this.nextFragment = this.codeFragments[this.idx + 1];
      }

      if (codeCharType !== CodeCharType.none) {
        this.digestFragment(codeCharType);
      }
    }

    return this.codeFragments;
  }

  getNextFragment(
    skipWhiteSpace: boolean | null | undefined,
    prev: boolean | null | undefined
  ) {
    skipWhiteSpace = skipWhiteSpace ?? true;
    prev = prev ?? false;
    let nextFragment: CodeFragment | null | undefined;

    let i = this.idx + (prev ? -1 : 1);
    while (
      (prev === true && i >= 0) ||
      (prev === false && i < this.codeFragments.length)
    ) {
      let fragment = this.codeFragments[i];

      if (
        fragment.charsType !== CodeCharType.whiteSpace ||
        skipWhiteSpace === false
      ) {
        nextFragment = fragment;
        break;
      } else {
        i += prev ? -1 : 1;
      }
    }

    return nextFragment;
  }

  digestFragment(codeCharType: CodeCharType) {
    const parserState = this.parserState;
    const currentFragment = this.currentFragment;

    if (parserState.isSlComment) {
      if (currentFragment.isNewLine) {
        parserState.isSlComment = false;
      } else if (parserState.isMlComment) {
        this.handleMlCommentState(currentFragment, parserState);
      } else if (parserState.isSqStrLit) {
        this.handleSlStrLitState(currentFragment, parserState, "'");
      } else if (parserState.isDqStrLit) {
        this.handleSlStrLitState(currentFragment, parserState, '"');
      } else if (parserState.isMlStrLit) {
        this.handleMlStrLitState(currentFragment, parserState);
      } else if (parserState.isRegexpLit) {
        this.handleRegexpLitState(currentFragment, parserState);
      } else if (
        [
          CodeCharType.roundBracket,
          CodeCharType.squareBracket,
          CodeCharType.curlyBracket,
        ].indexOf(codeCharType) >= 0 &&
        typeof parserState.parensNotMatchingIdx !== "number"
      ) {
        this.handleBracket(currentFragment, parserState);
      } else if (
        [
          CodeCharType.whiteSpace,
          CodeCharType.word,
          CodeCharType.digit,
          CodeCharType.operatorSymbol,
        ].indexOf(codeCharType) < 0
      ) {
        if (currentFragment.code === "/") {
          this.handleFwdSlash(currentFragment, parserState);
        } else if (currentFragment.code === "'") {
          parserState.isSqStrLit = true;
        } else if (currentFragment.code === '"') {
          parserState.isDqStrLit = true;
        } else if (currentFragment.code === "`") {
          parserState.isMlStrLit = true;
        }
      }
    }
  }

  handleMlCommentState(
    currentFragment: CodeFragment,
    parserState: TypescriptCodeParserState
  ) {
    if (
      currentFragment.code === "*" &&
      this.nextCharEqAndOnSameLine(currentFragment, "/", this.nextFragment) ===
        true &&
      this.prevCharEqAndOnSameLine(currentFragment, "/", this.prevFragment) !==
        true
    ) {
      parserState.isMlComment = false;
    }
  }

  handleSlStrLitState(
    currentFragment: CodeFragment,
    parserState: TypescriptCodeParserState,
    quoteChar: string
  ) {
    const prevFragment = this.prevFragment;

    let isEndOfSlStrLit =
      currentFragment.code === quoteChar &&
      this.prevCharEqAndOnSameLine(currentFragment, "\\", this.prevFragment) ===
        false;

    if (!isEndOfSlStrLit) {
      if (currentFragment.isLastOfLine === true) {
        if (
          currentFragment.code !== "\\" ||
          currentFragment.isEndOfLine !== true
        ) {
          currentFragment.err = typescriptErrorCodes.getError(1002);
        } else {
          isEndOfSlStrLit = false;
        }
      }
    }

    if (isEndOfSlStrLit) {
      if (quoteChar === "'") {
        parserState.isSqStrLit = false;
      } else if (quoteChar === '"') {
        parserState.isDqStrLit = false;
      }
    }
  }

  handleMlStrLitState(
    currentFragment: CodeFragment,
    parserState: TypescriptCodeParserState
  ) {
    if (
      currentFragment.code === "`" &&
      this.prevCharEqAndOnSameLine(currentFragment, "\\", this.prevFragment) ===
        false
    ) {
      parserState.isMlStrLit = false;
    }
  }

  handleRegexpLitState(
    currentFragment: CodeFragment,
    parserState: TypescriptCodeParserState
  ) {
    if (
      currentFragment.code === "/" &&
      this.prevCharEqAndOnSameLine(currentFragment, "\\", this.prevFragment) ===
        false
    ) {
      parserState.isRegexpLit = false;
    }
  }

  handleBracket(
    currentFragment: CodeFragment,
    parserState: TypescriptCodeParserState
  ) {
    const { code, charsType } = currentFragment;
    const { openParens } = parserState;

    if (charsType.indexOf(code) == 0) {
      openParens.push(code);
    } else if (charsType.indexOf(code) === 1) {
      const lastOpenParen = openParens[openParens.length - 1];
      if (code === lastOpenParen) {
        openParens.pop();
      } else {
        parserState.parensNotMatchingIdx = this.sourceCode.length - 1;
        currentFragment.err = {
          errMsg: `Closing ${code} does not match opening ${lastOpenParen}`,
        };
      }
    }
  }

  handleFwdSlash(
    currentFragment: CodeFragment,
    parserState: TypescriptCodeParserState
  ) {
    if (this.prevCharEqAndOnSameLine(currentFragment, "/", this.prevFragment)) {
      parserState.isSlComment = true;
    } else if (
      this.nextCharEqAndOnSameLine(currentFragment, "*", this.nextFragment) !==
      true
    ) {
      parserState.isMlComment = true;
    } else if (
      [CodeCharType.word, CodeCharType.digit].indexOf(
        this.prevFragment?.charsType ?? CodeCharType.none
      ) < 0
    ) {
      parserState.isRegexpLit = true;
    }
  }

  reset() {
    super.reset();

    this.currentFragment = this.getBlankCodeFragment();
    this.idx = -1;

    this.parserState = getBlankParserState();
  }

  getBlankCodeFragment() {
    const codeFragment = {
      charsType: CodeCharType.none,
      code: "",
      isFirstOfNewLine: true,
    } as CodeFragment;

    return codeFragment;
  }

  prevCharEqAndOnSameLine(
    currentFragment: CodeFragment,
    char: string,
    prevFragment: CodeFragment | null | undefined
  ) {
    const eq =
      prevFragment?.code.endsWith(char) === true &&
      prevFragment?.succededByWhiteSpace === false &&
      currentFragment.precededByWhiteSpace == false;

    return eq;
  }

  nextCharEqAndOnSameLine(
    currentFragment: CodeFragment,
    char: string,
    nextFragment: CodeFragment | null | undefined
  ) {
    let eq =
      nextFragment?.code.startsWith(char) === true &&
      nextFragment?.precededByWhiteSpace === false &&
      currentFragment.succededByWhiteSpace == false;

    return eq;
  }
}
