export interface StrReplaceOpts {
  searchValue: {
    [Symbol.replace](
      string: string,
      replacer: (substring: string, ...args: any[]) => string
    ): string;
  };
  replacer: (substring: string, ...args: any[]) => string;
}

export const compareStringsAsInts = (
  leftVal: string,
  rightVal: string
): number => {
  let leftNum = parseInt(leftVal);
  let rightNum = parseInt(rightVal);

  let retVal = leftNum - rightNum;
  return retVal;
};

export const strReplaceAll = (
  val: string,
  str: string | RegExp,
  replacer: string
) => {
  let retVal = "";

  if (typeof val == "string") {
    retVal = val.replace(str, replacer);

    while (retVal !== val) {
      val = retVal;
      retVal = val.replace(str, replacer);
    }
  }

  return retVal;
};

export const strReplaceAllWith = (
  val: string,
  searchValue: string | RegExp,
  replacer: (substring: string, ...args: any[]) => string
) => {
  let retVal = "";

  if (typeof val == "string") {
    retVal = val.replace(searchValue, replacer);

    while (retVal !== val) {
      val = retVal;
      retVal = val.replace(searchValue, replacer);
    }
  }

  return retVal;
};

export const strCount = (val: string, str: string): number => {
  let replVal = 0;

  if (typeof val == "string") {
    while (val.length > 0) {
      let idx = val.indexOf(str);

      if (idx >= 0) {
        replVal++;
      } else {
        break;
      }

      val = val.substring(idx + 1);
    }
  }

  return replVal;
};

export const strContainsDigits = (str: string) => {
  const containsDigits = /\d+/.test(str);
  return containsDigits;
};

export const strIsAllDigits = (str: string) => {
  const isAllDigits = /^\d+$/.test(str);
  return isAllDigits;
};
