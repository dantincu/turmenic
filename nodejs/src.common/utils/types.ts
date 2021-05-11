export type Hash = {
  [key: string]: any;
};

export type GenericHash<T> = {
  [key: string]: T;
};

export type KeyValuePair<T> = {
  key: string;
  value: T;
};

export const getGenericHash = <T>(pairs: { key: string; value: T }[]) => {
  const retHash = {} as GenericHash<T>;

  pairs.forEach((pair) => {
    retHash[pair.key] = pair.value;
  });

  return retHash;
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

export const strArrToHash = <T>(
  strArr: string[],
  generator: (str: string) => T
): GenericHash<T> => {
  const hash: GenericHash<T> = {};

  strArr.forEach((str) => {
    hash[str] = generator(str);
  });

  return hash;
};

export const compareValues = <T>(left: T, right: T) => {
  let retVal = left === right;
  return retVal;
};

export const getObjEntries = <T>(obj: any): KeyValuePair<T>[] => {
  const pairsArr = Object.entries<T>(obj)
    .filter((pair) => typeof pair[0] !== "undefined")
    .map((pair) => {
      const retPair = {
        key: pair[0],
        value: pair[1],
      } as KeyValuePair<T>;

      return retPair;
    });

  return pairsArr;
};

export const compareObjs = <T>(left: T, right: T) => {
  let leftPairsArr = getObjEntries<any>(left);
  let rightPairsArr = getObjEntries<any>(right);

  let retVal = leftPairsArr.length === rightPairsArr.length;

  if (retVal && leftPairsArr.length > 0) {
    leftPairsArr.forEach((leftPair) => {
      if (retVal) {
        const rightPair = rightPairsArr.find(
          (pair) => pair.key === leftPair.key
        );

        if (rightPair) {
          retVal = compareValues(leftPair.value, rightPair.value);
        } else {
          retVal = false;
        }
      }
    });
  }

  return retVal;
};
