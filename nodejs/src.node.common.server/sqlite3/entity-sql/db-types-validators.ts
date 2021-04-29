import {
  ColumnDbType,
  DataTypeConvertor,
  PropJsType,
  DateTime,
  PropCustomType,
  getSqlite3DbError,
  Sqlite3DbError,
} from "./db-types.js";

import { dataTypeConvertors } from "./db-types-convertors.js";

export const getDataTypeConvNotFoundErrMsg = (
  columnDbType: ColumnDbType,
  propJsType: PropJsType,
  propCustomType?: PropCustomType | null | undefined
) => {
  let msg = `Could not find convertor for columnDbType=${columnDbType} and propJsType=${propJsType}`;

  if (propCustomType) {
    msg = `${msg} and propCustomType=${propCustomType}`;
  }

  return msg;
};

const getDataTypeConvSelPred = (
  columnDbType: ColumnDbType,
  propJsType: PropJsType,
  propCustomType: PropCustomType | null | undefined
) => {
  const stdPred = (cvtr: DataTypeConvertor) =>
    cvtr.columnDbType === columnDbType && cvtr.propJsType === propJsType;

  let predicate = stdPred;

  if (propCustomType) {
    predicate = (cvtr: DataTypeConvertor) =>
      stdPred(cvtr) && cvtr.propCustomType === propCustomType;
  } else {
    predicate = (cvtr: DataTypeConvertor) =>
      stdPred(cvtr) && !cvtr.propCustomType;
  }

  return predicate;
};

export const getDataTypeConvertor = (
  columnDbType: ColumnDbType,
  propJsType: PropJsType,
  propCustomType?: PropCustomType | null | undefined
) => {
  let predicate = getDataTypeConvSelPred(
    columnDbType,
    propJsType,
    propCustomType
  );

  let convertor = dataTypeConvertors.find(predicate);

  if (!convertor) {
    throw getSqlite3DbError(
      new Error(
        getDataTypeConvNotFoundErrMsg(columnDbType, propJsType, propCustomType)
      )
    );
  }

  return convertor;
};

export const dbToJsVal = (
  dbVal: any | null,
  columnDbType: ColumnDbType,
  propJsType: PropJsType,
  isPropRequired?: boolean | null | undefined,
  propCustomType?: PropCustomType | null | undefined
) => {
  assurePropValid(dbVal, isPropRequired);

  let jsVal: any | null | undefined;

  if (isDbNull(dbVal)) {
    jsVal = dbVal;
  } else {
    const convertor = getDataTypeConvertor(
      columnDbType,
      propJsType,
      propCustomType
    );

    jsVal = convertor.dbToJsVal(dbVal);
    assurePropValid(jsVal, isPropRequired);
  }

  return jsVal;
};

export const jsToDbVal = (
  jsVal: any | null,
  columnDbType: ColumnDbType,
  isPropRequired?: boolean | null | undefined,
  propCustomType?: PropCustomType | null | undefined
) => {
  const propJsType = typeof jsVal;
  assurePropValid(jsVal, isPropRequired);

  let dbVal: any | null | undefined;

  if (isDbNull(jsVal)) {
    dbVal = jsVal;
  } else {
    const convertor = getDataTypeConvertor(
      columnDbType,
      propJsType as PropJsType,
      propCustomType
    );

    dbVal = convertor.jsToDbVal(jsVal);
    assurePropValid(dbVal, isPropRequired);
  }

  return dbVal;
};

export const isDbNull = (val: any) => {
  let retVal = typeof val === "undefined" || val === null;
  return retVal;
};

export const assurePropValid = (
  val: any,
  isPropRequired?: boolean | null | undefined
) => {
  if (isPropRequired && isDbNull(val)) {
    throw getSqlite3DbError(
      new Error(`Required prop value has falsy value ${val}`)
    );
  } else {
    const typeName = typeof val; // "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"

    if (typeName === "number" && isNaN(val)) {
      throw getSqlite3DbError(new Error(`Prop value is NaN ${val}`));
    } else if (typeName === "symbol") {
      throw getSqlite3DbError(
        new Error(
          `Expected javascript type to be either string, number, boolean or object but received ${typeName}`
        )
      );
    } else if (["bigint", "function"].indexOf(typeName) >= 0) {
      throw getSqlite3DbError(
        new Error(
          `Expected javascript type to be either string, number, boolean or object but received ${typeName}: ${val}`
        )
      );
    }
  }
};

export const assureJsValOfType = (jsVal: any, jsDataType: PropJsType) => {
  const jsValType = typeof jsVal;

  if (jsValType !== "undefined" && jsVal !== null && jsValType !== jsDataType) {
    throw getSqlite3DbError(
      new Error(
        `Expected javascript type ${jsDataType} but received ${jsValType}: ${jsVal}`
      )
    );
  }
};

export const assureJsValIsBit = (jsVal: number) => {
  jsVal = jsVal ?? 0;

  if (isNaN(jsVal) || (jsVal !== 0 && jsVal !== 1)) {
    throw getSqlite3DbError(
      new Error(
        `Expected javascript value to be either 0 or 1 but received ${jsVal}`
      )
    );
  }
};

export const assureJsValIsInt = (jsVal: number) => {
  jsVal = jsVal ?? 0;
  if (jsVal !== Math.floor(jsVal)) {
    throw getSqlite3DbError(
      new Error(
        `Expected javascript value to be an integer number but received ${jsVal}`
      )
    );
  }
};

export const assureJsValIsPositiveNumber = (
  jsVal: number,
  strictlyPositive?: boolean | null | undefined
) => {
  jsVal = jsVal ?? 1;
  if (jsVal < 0) {
    throw getSqlite3DbError(
      new Error(
        `Expected javascript value to be positive number but received ${jsVal}`
      )
    );
  } else if (jsVal === 0 && strictlyPositive) {
    throw getSqlite3DbError(
      new Error(
        `Expected javascript value to be strictly positive number but received ${jsVal}`
      )
    );
  }
};

export const convertJsValue = <TArg, TRetVal>(
  jsVal: TArg | null | undefined,
  func: (jsVal: TArg) => TRetVal
): TRetVal | null => {
  let retVal: TRetVal | null = null;

  if (typeof jsVal !== "undefined" && jsVal !== null) {
    retVal = func(jsVal);
  }

  return retVal;
};
