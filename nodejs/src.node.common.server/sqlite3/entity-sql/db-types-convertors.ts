import {
  ColumnDbType,
  DataTypeConvertor,
  PropJsType,
  DateTime,
  PropCustomType,
  Sqlite3DbError,
  getSqlite3DbError,
} from "./db-types.js";

import {
  assureJsValOfType,
  isDbNull,
  assureJsValIsBit,
  assureJsValIsInt,
  assureReqPropValid,
  getDataTypeConvertor,
  assureJsValIsPositiveNumber,
  convertJsValue,
} from "./db-types-validators.js";

export const dataTypeConvertors: DataTypeConvertor[] = [
  {
    propJsType: PropJsType.string,
    columnDbType: ColumnDbType.text,
    dbToJsVal: (dbVal: any) => {
      assureJsValOfType(dbVal, PropJsType.string);

      const jsVal = convertJsValue(dbVal, (dbVal) => dbVal);
      return jsVal;
    },
    jsToDbVal: (jsVal: any) => {
      assureJsValOfType(jsVal, PropJsType.string);

      const dbVal = convertJsValue(jsVal, (jsVal) => jsVal);
      return dbVal;
    },
  },
  {
    propJsType: PropJsType.boolean,
    columnDbType: ColumnDbType.integer,
    dbToJsVal: (dbVal: any) => {
      assureJsValOfType(dbVal, PropJsType.number);
      assureJsValIsBit(dbVal);

      const jsVal = convertJsValue(dbVal, (dbVal) => dbVal === 1);
      return jsVal;
    },
    jsToDbVal: (jsVal: any) => {
      assureJsValOfType(jsVal, PropJsType.boolean);

      const dbVal = convertJsValue(jsVal, (jsVal) => (jsVal ? 1 : 0));
      return dbVal;
    },
  },
  {
    propJsType: PropJsType.number,
    columnDbType: ColumnDbType.integer,
    dbToJsVal: (dbVal: any) => {
      assureJsValOfType(dbVal, PropJsType.number);
      assureJsValIsInt(dbVal);

      const jsVal = convertJsValue(dbVal, (dbVal) => dbVal);
      return jsVal;
    },
    jsToDbVal: (jsVal: any) => {
      assureJsValOfType(jsVal, PropJsType.number);
      assureJsValIsInt(jsVal);

      const dbVal = convertJsValue(jsVal, (jsVal) => jsVal);
      return dbVal;
    },
  },
  {
    propJsType: PropJsType.number,
    columnDbType: ColumnDbType.numeric,
    dbToJsVal: (dbVal: any) => {
      assureJsValOfType(dbVal, PropJsType.number);

      const jsVal = convertJsValue(dbVal, (dbVal) => dbVal);
      return jsVal;
    },
    jsToDbVal: (jsVal: any) => {
      assureJsValOfType(jsVal, PropJsType.number);

      const dbVal = convertJsValue(jsVal, (jsVal) => jsVal);
      return dbVal;
    },
  },
  {
    propJsType: PropJsType.number,
    columnDbType: ColumnDbType.real,
    dbToJsVal: (dbVal: any) => {
      assureJsValOfType(dbVal, PropJsType.number);

      const jsVal = convertJsValue(dbVal, (dbVal) => dbVal);
      return jsVal;
    },
    jsToDbVal: (jsVal: any) => {
      assureJsValOfType(jsVal, PropJsType.number);

      const dbVal = convertJsValue(jsVal, (jsVal) => jsVal);
      return dbVal;
    },
  },
  {
    propJsType: PropJsType.object,
    columnDbType: ColumnDbType.integer,
    propCustomType: PropCustomType.dateTime,
    dbToJsVal: (dbVal: any) => {
      assureJsValOfType(dbVal, PropJsType.number);
      assureJsValIsInt(dbVal);

      assureJsValIsPositiveNumber(dbVal, true);

      const jsVal = convertJsValue(dbVal, (dbVal) => {
        const jsVal: DateTime = {
          value: new Date(dbVal),
          millis: dbVal,
        };

        return jsVal;
      });

      return jsVal;
    },
    jsToDbVal: (jsVal: any) => {
      assureJsValOfType(jsVal, PropJsType.object);

      const dbVal = convertJsValue(jsVal, (jsVal) => {
        const dateTimeJsVal = jsVal as DateTime;

        assureJsValIsPositiveNumber(dateTimeJsVal.millis, true);
        assureJsValOfType(dateTimeJsVal.value, PropJsType.object);

        let dbVal: number | null = null;
        if (dateTimeJsVal.millis) {
          dbVal = dateTimeJsVal.millis;
        } else {
          dbVal = dateTimeJsVal.value.getTime();
        }

        return dbVal;
      });

      return dbVal;
    },
  },
];
