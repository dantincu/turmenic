export const contains = <T>(arr: T[], item: T) => {
  const found = arr.indexOf(item) >= 0;
  return found;
};

export const findIndex = <T>(
  arr: T[],
  selector: (item: T, idx: number, itemsArr: T[]) => boolean
): { item: T | null; index: number } => {
  let item: T | null = null;
  let index = -1;

  item =
    arr.find((value, idx, arr) => {
      const match = selector(value, idx, arr);
      if (match) {
        index = idx;
      }

      return match;
    }) ?? null;

  return { item, index };
};
