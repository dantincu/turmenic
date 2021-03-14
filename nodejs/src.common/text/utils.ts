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
  replExpr: string
) => {
  let replVal = null;

  if (typeof val == "string") {
    replVal = val.replace(str, replExpr);

    while (replVal !== val) {
      val = replVal;
      replVal = val.replace(str, replExpr);
    }
  }

  return replVal;
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
