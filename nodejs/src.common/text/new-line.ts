import { GenericHash } from "../utils/types.js";

/*
According to https://en.wikipedia.org/wiki/Newline#Unicode
The Unicode standard defines a number of characters that conforming applications should recognize as line terminators:[6]

 LF:    Line Feed, U+000A
 VT:    Vertical Tab, U+000B
 FF:    Form Feed, U+000C
 CR:    Carriage Return, U+000D
 CR+LF: CR (U+000D) followed by LF (U+000A)
 NEL:   Next Line, U+0085
 LS:    Line Separator, U+2028
 PS:    Paragraph Separator, U+2029

NL is included in EBCDIC with code 0x15, and often mapped to NEL, which is a control character in the C1 control set.
As such, it is defined by ECMA 48,[8] and recognized by encodings compliant with ISO/IEC 2022 (which is equivalent to ECMA 35).
C1 control set is also compatible with ISO-8859-1. The approach taken in the Unicode standard allows round-trip transformation
to be information-preserving while still enabling applications to recognize all possible types of line terminators.
*/

export const basicNewLineChars = Object.freeze({
  lf: {
    // line feed
    val: "\u000A",
    esc: "\n",
  },
  vt: {
    // vertical tab
    val: "\u000B",
  },
  ff: {
    // form feed
    val: "\u000C",
  },
  cr: {
    // carriage return
    val: "\u000D",
    esc: "\r",
  },
  crlf: {
    // carriage return followed by line feed
    val: "\u000D\u000A",
    esc: "\r\n",
  },
});

export const extendedNewLineChars = Object.freeze({
  nel: {
    // next line
    val: "\u0085",
  },
  ls: {
    // line separator
    val: "\u2028",
  },
  ps: {
    // paragraph separator
    val: "\u2029",
  },
});

export const allNewLineChars = Object.freeze({
  ...basicNewLineChars,
  ...extendedNewLineChars,
});

export const basicNewLineCharsArr = Object.entries(basicNewLineChars).map(
  (e) => e[1].val
);

export const isBasicNewLineChar = (char: string) => {
  const retVal = basicNewLineCharsArr.indexOf(char) > 0;
  return retVal;
};
