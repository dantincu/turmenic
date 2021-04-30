export const contains = <T>(arr: T[], val: T) => {
  const found = arr.indexOf(val) >= 0;
  return found;
};

export const findIndex = <T>(
  arr: T[],
  selector: (val: T, idx: number, arr: T[]) => boolean,
  startIndex?: number
): { val: T | null; idx: number } => {
  let value: T | null = null;
  let index = -1;
  startIndex = startIndex ?? 0;

  value =
    arr.find((val, idx, arr) => {
      const match = idx >= (startIndex as number) && selector(val, idx, arr);
      if (match) {
        index = idx;
      }

      return match;
    }) ?? null;

  return { val: value, idx: index };
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

export const splice = <T>(
  arr: T[],
  start: number,
  deleteCount: number,
  items: T[]
) => {
  const retArr = [...arr];
  retArr.splice(start, deleteCount, ...items);

  return retArr;
};
