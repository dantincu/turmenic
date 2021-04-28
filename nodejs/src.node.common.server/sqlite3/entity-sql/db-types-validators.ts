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

const getDataTypeConvNotFoundErrMsg = (
  columnDbType: string,
  propJsType: string,
  propCustomType?: PropCustomType | null | undefined
) => {
  let msg = `Could not find convertor for columnDbType=${columnDbType} and propJsType=${propJsType}`;

  if (propCustomType) {
    msg = `${msg} and propCustomType=${propCustomType}`;
  }

  return msg;
};

const getDataTypeConvSelPred = (
  columnDbType: string,
  propJsType: string,
  propCustomType: PropCustomType | null | undefined
) => {
  const stdPred = (cvtr: DataTypeConvertor) =>
    cvtr.columnDbType === columnDbType && cvtr.propJsType === propJsType;

  let predicate = stdPred;

  if (propCustomType) {
    predicate = (cvtr: DataTypeConvertor) =>
      stdPred(cvtr) && cvtr.propCustomType === propCustomType;
  }

  return predicate;
};

export const getDataTypeConvertor = (
  columnDbType: string,
  propJsType: string,
  propCustomType?: PropCustomType | null | undefined
) => {
  let predicate = getDataTypeConvSelPred(
    columnDbType,
    propJsType,
    propCustomType
  );

  let convertor = dataTypeConvertors.find(predicate);

  if (!convertor) {
    throw new Error(
      getDataTypeConvNotFoundErrMsg(columnDbType, propJsType, propCustomType)
    );
  }

  return convertor;
};

export const dbToJsVal = (
  dbVal: any | null,
  columnDbType: string,
  propJsType: string,
  isPropRequired?: boolean | null | undefined,
  propCustomType?: PropCustomType | null | undefined
) => {
  assureReqPropValid(dbVal, isPropRequired);

  const convertor = getDataTypeConvertor(
    columnDbType,
    propJsType,
    propCustomType
  );

  const jsVal = convertor.dbToJsVal(dbVal);
  assureReqPropValid(jsVal, isPropRequired);

  return jsVal;
};

export const jsToDbVal = (
  jsVal: any | null,
  columnDbType: string,
  isPropRequired?: boolean | null | undefined,
  propCustomType?: PropCustomType | null | undefined
) => {
  const propJsType = typeof jsVal;
  assureReqPropValid(jsVal, isPropRequired);

  const convertor = getDataTypeConvertor(
    columnDbType,
    propJsType,
    propCustomType
  );

  const dbVal = convertor.jsToDbVal(jsVal);
  assureReqPropValid(dbVal, isPropRequired);

  return dbVal;
};

export const isDbNull = (val: any) => {
  const valType = typeof val;
  let retVal = valType === "undefined";
  retVal = retVal || val === null;

  retVal = retVal || (valType === "number" && isNaN(val));
  return retVal;
};

export const assureReqPropValid = (
  val: any,
  isPropRequired?: boolean | null | undefined
) => {
  if (isPropRequired && isDbNull(val)) {
    throw getSqlite3DbError(
      new Error(`Required prop value has falsy value ${val}`)
    );
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
  if (jsVal !== 0 && jsVal !== 1) {
    throw getSqlite3DbError(
      new Error(
        `Expected javascript value to be either 0 or 1, but received ${jsVal}`
      )
    );
  }
};

export const assureJsValIsInt = (jsVal: number) => {
  jsVal = jsVal ?? 0;
  if (jsVal !== Math.floor(jsVal)) {
    throw getSqlite3DbError(
      new Error(
        `Expected javascript value to be an integer number, but received ${jsVal}`
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
        `Expected javascript value to be positive number, but received ${jsVal}`
      )
    );
  } else if (jsVal === 0 && strictlyPositive) {
    throw getSqlite3DbError(
      new Error(
        `Expected javascript value to be strictly positive number, but received ${jsVal}`
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
