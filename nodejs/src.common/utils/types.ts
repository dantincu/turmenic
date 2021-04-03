export type Hash = {
  [key: string]: any;
};

export type GenericHash<T> = {
  [key: string]: T;
};

export const cloneHashDeep = (hash: Hash) => {
  const cloneHash = { ...hash };

  for (const [key, value] of Object.entries(hash)) {
    if (typeof value === "object" && value !== null) {
      cloneHash[key] = cloneDeep(value);
    }
  }

  return cloneHash;
};

export const cloneDeep = <TObj extends Hash>(obj: TObj): TObj => {
  const clone = cloneHashDeep(obj);
  const retObj = clone as TObj;

  return retObj;
};

export const cloneArrDeep = <TObj extends Hash>(arr: TObj[]): TObj[] => {
  const cloneArr = arr.map((obj) => cloneDeep(obj));
  return cloneArr;
};

export const getPropVal = <TObj, TVal>(
  obj: TObj | null,
  propName?: string | null
) => {
  let retVal: TVal | null = null;

  if (obj && propName) {
    retVal = (obj[propName as keyof TObj] as unknown) as TVal;
  }

  return retVal;
};

export const setPropVal = <TObj, TVal>(
  obj: TObj,
  propName: string,
  propVal?: TVal | null | undefined
) => {
  const objAsAny = obj as any;
  const prevVal = (objAsAny[propName] as unknown) as TVal;

  objAsAny[propName] = propVal;
  return prevVal;
};

export const hasValue = (val: unknown) => {
  const retVal =
    typeof val !== "undefined" &&
    val !== null &&
    (typeof val !== "number" || isNaN(val) === false);

  return retVal;
};
