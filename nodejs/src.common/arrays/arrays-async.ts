export const forEachAsync = async <T>(
  arr: T[],
  func: (val: T, idx: number, arr: T[]) => Promise<void>
) => {
  for (let i = 0; i < arr.length; i++) {
    await func(arr[i], i, arr);
  }
};

export const findIndexAsync = async <T>(
  arr: T[],
  selector: (val: T, idx: number, arr: T[]) => Promise<boolean>,
  startIndex?: number
): Promise<{ val: T | null; idx: number }> => {
  let value: T | null = null;
  let index = -1;
  startIndex = startIndex ?? 0;

  await forEachAsync(arr, async (val, idx, arr) => {
    if (index < 0) {
      const match =
        idx > (startIndex as number) && (await selector(val, idx, arr));

      if (match) {
        index = idx;
        value = val;
      }
    }
  });

  return { val: value, idx: index };
};

export const filterIndexAsync = async <T>(
  arr: T[],
  selector: (val: T, idx: number, arr: T[]) => Promise<boolean>
): Promise<{ val: T | null; idx: number }[]> => {
  let retArr: { val: T | null; idx: number }[] = [];

  await forEachAsync(arr, async (val, idx, arr) => {
    if (await selector(val, idx, arr)) {
      retArr.push({ val, idx });
    }
  });

  return retArr;
};

export const mapAsync = async <TIn, TOut>(
  inArr: TIn[],
  selector: (val: TIn, idx: number, arr: TIn[]) => Promise<TOut>
) => {
  const outArr: TOut[] = [];

  await forEachAsync(inArr, async (val, idx, arr) => {
    outArr.push(await selector(val, idx, arr));
  });

  return outArr;
};
