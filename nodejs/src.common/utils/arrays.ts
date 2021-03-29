export const contains = <T>(arr: T[], val: T) => {
  const found = arr.indexOf(val) >= 0;
  return found;
};

export const findIndex = <T>(
  arr: T[],
  selector: (val: T, idx: number, arr: T[]) => boolean,
  startIndex?: number
): { val: T | null; idx: number } => {
  let val: T | null = null;
  let idx = -1;
  startIndex = startIndex ?? 0;

  val =
    arr.find((val, index, arr) => {
      const match = index > startIndex && selector(val, index, arr);
      if (match) {
        idx = index;
      }

      return match;
    }) ?? null;

  return { val, idx };
};

export const filterIndex = <T>(
  arr: T[],
  selector: (val: T, idx: number, arr: T[]) => boolean
): { val: T | null; idx: number }[] => {
  let retArr: { val: T | null; idx: number }[] = [];

  arr.forEach((val, idx, arr) => {
    const match = selector(val, idx, arr);
    if (match) {
      retArr.push({ val, idx });
    }
  });

  return retArr;
};

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
    const fndIdx = findIndex(destArr, (destVal) => match(val, destVal)).idx;

    if (fndIdx < 0) {
      destArr.push(val);
    } else {
      destArr.splice(fndIdx, 1, val);
    }
  });

  let crntIdx = 0;

  while (crntIdx < destArr.length) {
    const crntVal = destArr[crntIdx];
    if (findIndex(srcArr, (srcVal) => match(crntVal, srcVal)).idx < 0) {
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
