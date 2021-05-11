import { KeyValuePair } from "../utils/types.js";

export interface TrimOpts {
  replExpr: KeyValuePair<string>[];
  trimWhiteSpace?: boolean | null | undefined;
}

export interface StrTrimOpts {
  trimStart?: TrimOpts | null | undefined;
  trimEnd?: TrimOpts | null | undefined;
}

const validateReplacedExpr = (expr: TrimOpts) => {
  expr.replExpr.forEach((pair) => {
    validateReplacedValue(pair.key);
  });
};

const validateReplacedValue = (key: string) => {
  if (key.length === 0) {
    throw new Error("Replaced value cannot be empty");
  }
};

export const trimStartReplaceOnce = (str: string, expr: TrimOpts) => {
  let loopEnd = false;

  expr.replExpr.forEach((pair) => {
    if (!loopEnd) {
      if (expr.trimWhiteSpace) {
        str = str.trimStart();
      }

      if (str.startsWith(pair.key)) {
        str = [pair.value, str.substring(pair.key.length)].join("");
        loopEnd = true;
      }
    }
  });

  return str;
};

export const trimEndReplaceOnce = (str: string, expr: TrimOpts) => {
  let loopEnd = false;

  expr.replExpr.forEach((pair) => {
    if (!loopEnd) {
      if (expr.trimWhiteSpace) {
        str = str.trimEnd();
      }

      if (str.endsWith(pair.key)) {
        str = [str.substring(0, str.length - pair.key.length), pair.value].join(
          ""
        );
        loopEnd = true;
      }
    }
  });

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

export const trimReplaceOnce = (str: string, opts: StrTrimOpts) => {
  if (opts.trimStart) {
    str = trimStartReplaceOnce(str, opts.trimStart);
  }

  if (opts.trimEnd) {
    str = trimEndReplaceOnce(str, opts.trimEnd);
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
