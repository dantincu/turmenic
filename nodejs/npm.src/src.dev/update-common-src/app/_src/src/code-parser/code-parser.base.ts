import { isBasicNewLineChar } from "../../src.common/text/new-line.js";

export enum CodeCharType {
  none = "",
  whiteSpace = "\\s", // 2 chars, starts with \\
  word = "\\w", // 2 chars, starts with \\
  digit = "\\d", // 2 chars, starts with \\
  operatorSymbol = ".,:;=+-*%<>~&|^?!", // more than 2 chars
  fwdSlash = "/", // 1 char
  backSlash = "\\", // 1 char
  sQuote = "'", // 1 char
  dQuote = '"', // 1 char
  mlQuote = "`", // 1 char
  angularBracket = "<>", // 2 chars, doesn't start with \\
  curlyBracket = "{}", // 2 chars, doesn't start with \\
  squareBracket = "[]", // 2 chars, doesn't start with \\
  roundBracket = "()", // 2 chars, doesn't start with \\
}

export const DEFAULT_OP_SYMBOLS = CodeCharType.operatorSymbol.toString();

export interface CodeSyntaxError {
  errMsg?: string | null | undefined;
  errCodeStr?: string | null | undefined;
  errCode?: number | null | undefined;
}

export interface CodeFragment {
  isFirstLine?: boolean | null | undefined;
  isLastLine?: boolean | null | undefined;
  isNewLine?: boolean | null | undefined;
  isEndOfLine?: boolean | null | undefined;
  isFirstOfNewLine?: boolean | null | undefined;
  isLastOfLine?: boolean | null | undefined;
  precededByWhiteSpace?: boolean | null | undefined;
  succededByWhiteSpace?: boolean | null | undefined;
  code: string;
  charsType: CodeCharType;
  err?: CodeSyntaxError | null | undefined;
}

export interface BasicCodeFragment {
  isWhiteSpace?: boolean | null | undefined;
  isEndOfLine?: boolean | null | undefined;
  code: string;
}

export const isAllWhiteSpace = (str: string) => {
  const retVal = !!str.match(/^\s+$/g);
  return retVal;
};

export const containsWhiteSpace = (str: string) => {
  const retVal = !!str.match(/\s+/g);
  return retVal;
};

export const startsWithWhiteSpace = (str: string) => {
  const retVal = !!str.match(/^\s+/g);
  return retVal;
};

export const endsWithWhiteSpace = (str: string) => {
  const retVal = !!str.match(/\s+$/g);
  return retVal;
};

export const containsNewLine = (str: string) => {
  const retVal = !!str.match(/\n/g);
  return retVal;
};

export const assureInputCharIsValid = (char: string) => {
  const type = typeof char;
  const length = char.length;

  if (type !== "string") {
    throw new Error(`Invalid input type "${type}"; expected "string".`);
  }

  if (length !== 1) {
    throw new Error(
      `Invalid input length: ${length}; expected 1 (one character).`
    );
  }
};
