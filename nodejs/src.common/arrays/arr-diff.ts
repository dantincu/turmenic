import { compareObjs } from "../utils/types.js";
import { contains, filterIndex, findIndex } from "./arrays.js";

export interface ArrayDiff<T> {
  leftOnly: { val: T; idx: number }[];
  rightOnly: { val: T; idx: number }[];
  common: { val: T }[];
}

export const arrDiff = <T>(
  leftArr: T[],
  rightArr: T[],
  containsFunc: <T>(arr: T[], item: T) => boolean = contains
) => {
  const diff: ArrayDiff<T> = {
    common: [],
    leftOnly: [],
    rightOnly: [],
  };

  leftArr.forEach((val, idx) => {
    if (containsFunc(rightArr, val)) {
      diff.common.push({ val });
    } else {
      diff.leftOnly.push({ val, idx });
    }
  });

  rightArr.forEach((val, idx) => {
    if (containsFunc(leftArr, val) === false) {
      diff.rightOnly.push({ val, idx });
    }
  });

  return diff;
};

export const updateMergeArr = <T>(
  destArr: T[],
  srcArr: T[],
  match: (leftItm: T, rightItm: T) => boolean
) => {
  srcArr.forEach((val) => {
    const fndIdx = findIndex(destArr, (destVal) => {
      const result = match(val, destVal);
      return result;
    }).idx;

    if (fndIdx < 0) {
      destArr.push(val);
    } else {
      destArr.splice(fndIdx, 1, val);
    }
  });

  let crntIdx = 0;

  while (crntIdx < destArr.length) {
    const crntVal = destArr[crntIdx];
    if (
      findIndex(srcArr, (srcVal) => {
        const result = match(crntVal, srcVal);
        return result;
      }).idx < 0
    ) {
      destArr.splice(crntIdx, 1);
    } else {
      crntIdx++;
    }
  }
};

export const removeDuplicates = <T>(
  arr: T[],
  match: (leftItm: T, rightItm: T) => boolean
): T[] => {
  let i = 0;
  while (i < arr.length) {
    let findRes = findIndex(arr, (val) => match(arr[i], val), i);
    if (findRes.idx >= 0) {
      arr.splice(findRes.idx, 1);
    } else {
      i++;
    }
  }

  return arr;
};

export const arraysAreEqual = <T>(leftArr: T[], rightArr: T[]) => {
  let retVal = leftArr.length === rightArr.length;

  if (retVal && leftArr.length > 0) {
    const clonedArr = [...rightArr];

    leftArr.forEach((leftItem) => {
      if (retVal) {
        const retIdx = findIndex(clonedArr, (rightItem) =>
          compareObjs(leftItem, rightItem)
        );

        if (retIdx.idx >= 0) {
          clonedArr.splice(retIdx.idx, 1);
        } else {
          retVal = false;
        }
      }
    });
  }

  return retVal;
};
