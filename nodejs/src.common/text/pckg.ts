import { compareStringsAsInts, strReplaceAll, strCount } from "./utils.js";

export const compareVersions = (vrsLeft: string, vrsRight: string) => {
  let retVal = 0;

  assureVersionIsValid(vrsLeft);
  assureVersionIsValid(vrsRight);

  let vrsLeftParts = vrsLeft.trim().split(".");
  let vrsRightParts = vrsRight.trim().split(".");

  let vrsPartsCount = Math.min(vrsLeftParts.length, vrsRightParts.length);

  for (let i = 0; i < vrsPartsCount; i++) {
    retVal = compareStringsAsInts(vrsLeftParts[i], vrsRightParts[i]);
    if (retVal !== 0) {
      break;
    }
  }

  if (retVal === 0) {
    retVal = vrsLeftParts.length - vrsRightParts.length;
  }

  return retVal;
};

export const isValidVersion = (vrs: string, vrsPartsCount = -1) => {
  let retVal =
    typeof vrs === "string" &&
    vrs.length > 0 &&
    typeof parseInt(strReplaceAll(vrs, ".", "") ?? "") == "number";

  if (retVal) {
    if (vrsPartsCount > 0) {
      retVal = strCount(vrs, ".") === vrsPartsCount - 1;
    }
  }

  return retVal;
};

export const assureVersionIsValid = (vrs: string, vrsPartsCount = 3) => {
  if (isValidVersion(vrs, vrsPartsCount) !== true) {
    throw new Error(`Provided version has invalid format ${vrs}`);
  }
};
