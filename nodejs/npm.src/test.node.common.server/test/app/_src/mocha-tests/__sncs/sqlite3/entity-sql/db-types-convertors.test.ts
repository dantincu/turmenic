import assert from "assert";
import { describe, it } from "mocha";

import {
  assureJsValIsBit,
  jsToDbVal,
  getDataTypeConvertor,
  dbToJsVal,
  assurePropValid,
  assureJsValIsInt,
  isDbNull,
  assureJsValIsPositiveNumber,
  assureJsValOfType,
  convertJsValue,
  getDataTypeConvNotFoundErrMsg,
} from "../../../../src.node.common.server/sqlite3/entity-sql/db-types-validators.js";

import {
  PropJsType,
  ColumnDbType,
  Sqlite3DbError,
  PropCustomType,
  DateTime,
} from "../../../../src.node.common.server/sqlite3/entity-sql/db-types.js";

import {
  assertThrowsSqlite3DbError,
  sampleFloatNumbers,
  sampleNegativeFloatNumbers,
  sampleIntNumbers,
  sampleNegativeIntNumbers,
} from "./entity-sql-tests.base.js";

import { getCallingModuleRelFilePath } from "../../../../src.node.common/stacktracey/stacktracey.js";
import { redirectStdStreams } from "../../../../src.node.common/testing/process.stream.js";

if (false) {
  await redirectStdStreams({
    outputDirRelPath: getCallingModuleRelFilePath({
      appSrcRelDirPath: "",
      srcFileExt: "ts",
    }),
  });
}

const describeGetDataTypeConvertor = (
  columnDbType: ColumnDbType,
  propJsType: PropJsType,
  propCustomType?: PropCustomType | null | undefined
) => {
  describe(`#getDataTypeConvertor(${columnDbType}, ${propJsType}, ${propCustomType})`, () => {
    it(`should return a corresponding object`, () => {
      const convertor = getDataTypeConvertor(
        columnDbType,
        propJsType,
        propCustomType
      );

      assert.strictEqual(typeof convertor, "object");
      assert.strictEqual(convertor.columnDbType, columnDbType);
      assert.strictEqual(convertor.propJsType, propJsType);

      if (propCustomType) {
        assert.strictEqual(convertor.propCustomType, propCustomType);
      }
    });
  });
};

const describeGetDataTypeConvertorThrows = (
  columnDbType: ColumnDbType,
  propJsType: PropJsType,
  propCustomType?: PropCustomType | null | undefined
) => {
  console.log(
    "getDataTypeConvNotFoundErrMsg(columnDbType, propJsType, propCustomType)",
    getDataTypeConvNotFoundErrMsg(columnDbType, propJsType, propCustomType)
  );
  describe(`#getDataTypeConvertor(${columnDbType}, ${propJsType}, ${propCustomType})`, () => {
    assertThrowsSqlite3DbError(() => {
      getDataTypeConvertor(columnDbType, propJsType, propCustomType);
    }, getDataTypeConvNotFoundErrMsg(columnDbType, propJsType, propCustomType));
  });
};

const validConvertors: {
  columnDbType: ColumnDbType;
  propJsType: PropJsType;
  propCustomType?: PropCustomType | null | undefined;
}[] = [
  {
    columnDbType: ColumnDbType.text,
    propJsType: PropJsType.string,
  },
  {
    columnDbType: ColumnDbType.integer,
    propJsType: PropJsType.boolean,
  },
  {
    columnDbType: ColumnDbType.integer,
    propJsType: PropJsType.number,
  },
  {
    columnDbType: ColumnDbType.numeric,
    propJsType: PropJsType.number,
  },
  {
    columnDbType: ColumnDbType.real,
    propJsType: PropJsType.number,
  },
  {
    columnDbType: ColumnDbType.integer,
    propJsType: PropJsType.object,
    propCustomType: PropCustomType.dateTime,
  },
];

const isValidConvertor = (
  columnDbType: ColumnDbType,
  propJsType: PropJsType,
  propCustomType?: PropCustomType | null | undefined
) => {
  let matchingArr = validConvertors.filter(
    (convertor) =>
      convertor.columnDbType === columnDbType &&
      convertor.propJsType === propJsType
  );

  if (propCustomType) {
    matchingArr = matchingArr.filter(
      (convertor) => convertor.propCustomType === propCustomType
    );
  } else {
    matchingArr = matchingArr.filter((convertor) => !convertor.propCustomType);
  }

  if (matchingArr.length > 1) {
    throw new Error("Found more than one valid convertor. Test cases failed");
  }

  const isValid = matchingArr.length === 1;
  return isValid;
};

describe("getDataTypeConvertor", () => {
  Object.values(ColumnDbType).forEach((columnDbType) => {
    Object.values(PropJsType).forEach((propJsType) => {
      if (isValidConvertor(columnDbType, propJsType)) {
        describeGetDataTypeConvertor(columnDbType, propJsType);
      } else {
        describeGetDataTypeConvertorThrows(columnDbType, propJsType);
      }
    });
  });
});

const describeJsToDbVal = (
  jsVal: any,
  dbVal: any,
  columnDbType: ColumnDbType,
  isPropRequired?: boolean | null | undefined,
  propCustomType?: PropCustomType | null | undefined
) => {
  describe(`#jsToDbVal(${jsVal}, ${columnDbType}, ${isPropRequired}, ${propCustomType})`, () => {
    it(`should return ${dbVal}`, () => {
      const retDbVal = jsToDbVal(
        jsVal,
        columnDbType,
        isPropRequired,
        propCustomType
      );

      assert.strictEqual(retDbVal, dbVal);
    });
  });
};

const describeDbToJsVal = (
  dbVal: any,
  jsVal: any,
  columnDbType: ColumnDbType,
  propJsType: PropJsType,
  isPropRequired?: boolean | null | undefined,
  propCustomType?: PropCustomType | null | undefined,
  deepStrictEqual?: boolean | null | undefined
) => {
  describe(`#dbToJsVal(${dbVal}, ${columnDbType}, ${isPropRequired}, ${propCustomType})`, () => {
    it(`should return ${jsVal}`, () => {
      const retJsVal = dbToJsVal(
        dbVal,
        columnDbType,
        propJsType,
        isPropRequired,
        propCustomType
      );

      if (deepStrictEqual) {
        assert.deepStrictEqual(retJsVal, jsVal);
      } else {
        assert.strictEqual(retJsVal, jsVal);
      }
    });
  });
};

const describeJsToDbValThrows = (
  jsVal: any,
  columnDbType: ColumnDbType,
  errMsg: string,
  isPropRequired?: boolean | null | undefined,
  propCustomType?: PropCustomType | null | undefined
) => {
  describe(`#jsToDbVal(${jsVal}, ${columnDbType}, ${isPropRequired}, ${propCustomType})`, () => {
    assertThrowsSqlite3DbError(() => {
      jsToDbVal(jsVal, columnDbType, isPropRequired, propCustomType);
    }, errMsg);
  });
}; // `Required prop value has falsy value ${val}`

const describeJsToDbValThrowsRequired = (
  jsVal: any,
  columnDbType: ColumnDbType,
  propCustomType?: PropCustomType | null | undefined
) => {
  describeJsToDbValThrows(
    jsVal,
    columnDbType,
    `Required prop value has falsy value ${jsVal}`,
    true,
    propCustomType
  );
};

const describeDbToJsValThrows = (
  dbVal: any,
  columnDbType: ColumnDbType,
  propJsType: PropJsType,
  errMsg: string,
  isPropRequired?: boolean | null | undefined,
  propCustomType?: PropCustomType | null | undefined
) => {
  describe(`#dbToJsVal(${dbVal}, ${columnDbType}, ${propJsType}, ${isPropRequired}, ${propCustomType})`, () => {
    assertThrowsSqlite3DbError(() => {
      dbToJsVal(
        dbVal,
        columnDbType,
        propJsType,
        isPropRequired,
        propCustomType
      );
    }, errMsg);
  });
};

const describeDbToJsValThrowsRequired = (
  dbVal: any,
  columnDbType: ColumnDbType,
  propJsType: PropJsType,
  propCustomType?: PropCustomType | null | undefined
) => {
  describeDbToJsValThrows(
    dbVal,
    columnDbType,
    propJsType,
    `Required prop value has falsy value ${dbVal}`,
    true,
    propCustomType
  );
};

describe("jsToDbVal", () => {
  Object.values(ColumnDbType).forEach((columnDbType) => {
    describeJsToDbVal(null, null, columnDbType);
    describeJsToDbVal(undefined, undefined, columnDbType);

    describeJsToDbValThrowsRequired(null, columnDbType);
    describeJsToDbValThrowsRequired(undefined, columnDbType);
  });

  describeJsToDbVal("", "", ColumnDbType.text);
  describeJsToDbVal("", "", ColumnDbType.text, true);

  const sampleText = "asdf";
  describeJsToDbVal(sampleText, sampleText, ColumnDbType.text);
  describeJsToDbVal(sampleText, sampleText, ColumnDbType.text, true);

  [ColumnDbType.integer, ColumnDbType.numeric, ColumnDbType.real].forEach(
    (columnDbType) => {
      [1, -1, 0]
        .concat(sampleNegativeIntNumbers, sampleIntNumbers)
        .forEach((jsVal) => {
          describeJsToDbVal(jsVal, jsVal, columnDbType);
          describeJsToDbVal(jsVal, jsVal, columnDbType, true);
        });
    }
  );

  [ColumnDbType.numeric, ColumnDbType.real].forEach((columnDbType) => {
    sampleFloatNumbers.concat(sampleNegativeFloatNumbers).forEach((n) => {
      describeJsToDbVal(n, n, columnDbType);
      describeJsToDbVal(n, n, columnDbType, true);
    });
  });

  const date = new Date();
  const millis = date.getTime();

  describeJsToDbVal(
    {
      value: date,
      millis: millis,
    } as DateTime,
    millis,
    ColumnDbType.integer,
    false,
    PropCustomType.dateTime
  );

  describeJsToDbVal(
    {
      value: date,
      millis: millis,
    } as DateTime,
    millis,
    ColumnDbType.integer,
    true,
    PropCustomType.dateTime
  );

  describeJsToDbValThrowsRequired(
    null,
    ColumnDbType.integer,
    PropCustomType.dateTime
  );
  describeJsToDbValThrowsRequired(
    undefined,
    ColumnDbType.integer,
    PropCustomType.dateTime
  );

  describeJsToDbVal(false, 0, ColumnDbType.integer);
  describeJsToDbVal(false, 0, ColumnDbType.integer, true);
  describeJsToDbVal(true, 1, ColumnDbType.integer);
  describeJsToDbVal(true, 1, ColumnDbType.integer, true);
});

describe("dbTojsVal", () => {
  [ColumnDbType.integer, ColumnDbType.numeric, ColumnDbType.real].forEach(
    (columnDbType) => {
      describeDbToJsVal(null, null, columnDbType, PropJsType.number);
      describeDbToJsVal(undefined, undefined, columnDbType, PropJsType.number);

      describeDbToJsValThrowsRequired(null, columnDbType, PropJsType.number);
      describeDbToJsValThrowsRequired(
        undefined,
        columnDbType,
        PropJsType.number
      );
    }
  );

  describeDbToJsVal(null, null, ColumnDbType.text, PropJsType.string);
  describeDbToJsVal(undefined, undefined, ColumnDbType.text, PropJsType.string);

  describeDbToJsValThrowsRequired(null, ColumnDbType.text, PropJsType.string);
  describeDbToJsValThrowsRequired(
    undefined,
    ColumnDbType.text,
    PropJsType.string
  );

  ["", "asdf"].forEach((text) => {
    describeDbToJsVal(text, text, ColumnDbType.text, PropJsType.string);
    describeDbToJsVal(text, text, ColumnDbType.text, PropJsType.string, true);
  });

  [ColumnDbType.integer, ColumnDbType.numeric, ColumnDbType.real].forEach(
    (columnDbType) => {
      sampleIntNumbers.concat(sampleNegativeIntNumbers).forEach((dbVal) => {
        describeDbToJsVal(dbVal, dbVal, columnDbType, PropJsType.number);
        describeDbToJsVal(dbVal, dbVal, columnDbType, PropJsType.number, true);
      });
    }
  );

  [ColumnDbType.numeric, ColumnDbType.real].forEach((columnDbType) => {
    sampleFloatNumbers.concat(sampleNegativeFloatNumbers).forEach((dbVal) => {
      describeDbToJsVal(dbVal, dbVal, columnDbType, PropJsType.number);
      describeDbToJsVal(dbVal, dbVal, columnDbType, PropJsType.number, true);
    });
  });

  const date = new Date();
  const millis = date.getTime();

  describeDbToJsVal(
    millis,
    {
      value: date,
      millis: millis,
    } as DateTime,
    ColumnDbType.integer,
    PropJsType.object,
    false,
    PropCustomType.dateTime,
    true
  );

  describeDbToJsVal(
    millis,
    {
      value: date,
      millis: millis,
    } as DateTime,
    ColumnDbType.integer,
    PropJsType.object,
    true,
    PropCustomType.dateTime,
    true
  );

  describeDbToJsValThrowsRequired(
    null,
    ColumnDbType.integer,
    PropJsType.object,
    PropCustomType.dateTime
  );
  describeDbToJsValThrowsRequired(
    undefined,
    ColumnDbType.integer,
    PropJsType.object,
    PropCustomType.dateTime
  );

  describeDbToJsVal(0, false, ColumnDbType.integer, PropJsType.boolean);
  describeDbToJsVal(0, false, ColumnDbType.integer, PropJsType.boolean, true);
  describeDbToJsVal(1, true, ColumnDbType.integer, PropJsType.boolean);
  describeDbToJsVal(1, true, ColumnDbType.integer, PropJsType.boolean, true);
});
