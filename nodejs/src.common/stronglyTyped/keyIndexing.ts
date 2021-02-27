// From https://dev.to/mapleleaf/indexing-objects-in-typescript-1cgi
// `keyof any` is short for "string | number | symbol"
// since an object key can be any of those types, our key can too
// in TS 3.0+, putting just "string" raises an error
export const hasKey = <O>(obj: O, key: any): key is keyof O => {
  return key in obj;
};

export const getWithKey = <TObj, TKey, TVal>(obj: TObj, key: TKey): TVal => {
  let val = <TVal>(<unknown>obj[<keyof TObj>(<unknown>key)]);
  return val;
};

export const setWithKey = <TObj, TKey, TVal>(
  obj: TObj,
  key: TKey,
  val: TVal
): void => {
  obj[<keyof TObj>(<unknown>key)] = <TObj[keyof TObj]>(<unknown>val);
};
