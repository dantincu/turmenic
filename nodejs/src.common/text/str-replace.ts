import { GenericHash } from "../utils/types.js";

export interface TrimOpts {
  replExpr: GenericHash<string>;
  trimWhiteSpace?: boolean | null | undefined;
}

export interface StrTrimOpts {
  trimStart?: TrimOpts | null | undefined;
  trimEnd?: TrimOpts | null | undefined;
}

const validateReplacedExpr = (expr: TrimOpts) => {
  for (let [key, val] of Object.entries(expr.replExpr)) {
    validateReplacedValue(key);
  }
};

const validateReplacedValue = (key: string) => {
  if (key.length === 0) {
    throw new Error("Replaced value cannot be empty");
  }
};

export const trimStartReplaceOnce = (str: string, expr: TrimOpts) => {
  for (let [key, val] of Object.entries(expr.replExpr)) {
    if (expr.trimWhiteSpace) {
      str = str.trimStart();
    }
    if (str.startsWith(key)) {
      str = str.substring(key.length);
      break;
    }
  }

  return str;
};

export const trimEndReplaceOnce = (str: string, expr: TrimOpts) => {
  for (let [key, val] of Object.entries(expr.replExpr)) {
    if (expr.trimWhiteSpace) {
      str = str.trimEnd();
    }
    if (str.endsWith(key)) {
      str = str.substring(0, str.length - key.length);
      break;
    }
  }

  return str;
};

export const trimStartReplace = (str: string, expr: TrimOpts) => {
  validateReplacedExpr(expr);

  let prevStr = str;
  str = trimStartReplaceOnce(str, expr);

  while (str !== prevStr) {
    prevStr = str;
    str = trimStartReplaceOnce(str, expr);
  }

  return str;
};

export const trimEndReplace = (str: string, expr: TrimOpts) => {
  validateReplacedExpr(expr);

  let prevStr = str;
  str = trimEndReplaceOnce(str, expr);

  while (str !== prevStr) {
    prevStr = str;
    str = trimEndReplaceOnce(str, expr);
  }

  return str;
};

export const trimReplace = (str: string, opts: StrTrimOpts) => {
  if (opts.trimStart) {
    str = trimStartReplace(str, opts.trimStart);
  }

  if (opts.trimEnd) {
    str = trimEndReplace(str, opts.trimEnd);
  }

  return str;
};
