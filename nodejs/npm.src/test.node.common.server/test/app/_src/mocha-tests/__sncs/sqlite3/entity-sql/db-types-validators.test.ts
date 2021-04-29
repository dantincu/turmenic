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
} from "../../../../src.node.common.server/sqlite3/entity-sql/db-types-validators.js";

import {
  PropJsType,
  Sqlite3DbError,
} from "../../../../src.node.common.server/sqlite3/entity-sql/db-types.js";

import {
  assertThrowsSqlite3DbError,
  sampleFloatNumbers,
  sampleNegativeFloatNumbers,
  sampleIntNumbers,
  sampleNegativeIntNumbers,
} from "./entity-sql-tests.base.js";

const describeIsDbNull = (valName: string, val: any, retVal: boolean) => {
  describe(`#isDbNull(${valName})`, () => {
    it(`should return ${retVal}`, () => {
      assert.strictEqual(isDbNull(val), retVal);
    });
  });
};

describe("isDbNull", () => {
  describeIsDbNull("null", null, true);
  describeIsDbNull("undefined", undefined, true);
  describeIsDbNull("NaN", NaN, false);
  describeIsDbNull("0", 0, false);
  describeIsDbNull('""', "", false);
  describeIsDbNull("false", false, false);
});

const describeAssurePropValidThrowsRequired = (valName: string, val: any) => {
  describe(`#assurePropValid(${valName}, true)`, () => {
    assertThrowsSqlite3DbError(() => {
      assurePropValid(val, true);
    }, `Required prop value has falsy value ${val}`);
  });
};

const describeAssurePropValidThrowsNaN = (
  valName: string,
  val: any,
  reqVal: boolean
) => {
  describe(`#assurePropValid(${valName}, ${reqVal})`, () => {
    assertThrowsSqlite3DbError(() => {
      assurePropValid(val, reqVal);
    }, `Prop value is NaN ${val}`);
  });
};

const describeAssurePropValidThrowsNotSupported = (
  valName: string,
  val: any,
  reqVal?: boolean | null | undefined
) => {
  const typeName = typeof val;
  const errMsgVarPart =
    typeName === "symbol" ? typeName : `${typeName}: ${val}`;

  describe(`#assurePropValid(${valName}, ${reqVal})`, () => {
    assertThrowsSqlite3DbError(() => {
      assurePropValid(val, reqVal);
    }, `Expected javascript type to be either string, number, boolean or object but received ${errMsgVarPart}`);
  });
};

const describeAssurePropValidDoesNotThrow = (
  valName: string,
  val: any,
  reqVal: boolean
) => {
  describe(`#assurePropValid(${valName}, ${reqVal})`, () => {
    it(`should not throw any errors`, () => {
      assert.doesNotThrow(() => {
        assurePropValid(val, reqVal);
      });
    });
  });
};

describe("assurePropValid", () => {
  describeAssurePropValidThrowsRequired("null", null);
  describeAssurePropValidThrowsRequired("undefined", undefined);
  describeAssurePropValidThrowsNaN("NaN", NaN, true);
  describeAssurePropValidThrowsNaN("NaN", NaN, false);

  // "bigint", "symbol", "function"
  describeAssurePropValidThrowsNotSupported("1n", 1n);
  describeAssurePropValidThrowsNotSupported("1n", 1n, true);
  let sym1 = Symbol();
  describeAssurePropValidThrowsNotSupported("Symbol()", sym1);
  describeAssurePropValidThrowsNotSupported("Symbol()", sym1, true);
  describeAssurePropValidThrowsNotSupported("() => {}", () => {});
  describeAssurePropValidThrowsNotSupported("() => {}", () => {}, true);

  describeAssurePropValidDoesNotThrow("null", null, false);
  describeAssurePropValidDoesNotThrow("undefined", undefined, false);

  describeAssurePropValidDoesNotThrow("0", 0, true);
  describeAssurePropValidDoesNotThrow("0", 0, false);
  describeAssurePropValidDoesNotThrow('""', "", true);
  describeAssurePropValidDoesNotThrow('""', "", false);
  describeAssurePropValidDoesNotThrow("false", false, true);
  describeAssurePropValidDoesNotThrow("false", false, false);
  describeAssurePropValidDoesNotThrow("true", true, true);
  describeAssurePropValidDoesNotThrow("true", true, false);
});

const describeAssureJsValIsBitThrows = (valName: string, val: any) => {
  describe(`#assureJsValIsBit(${valName})`, () => {
    assertThrowsSqlite3DbError(() => {
      assureJsValIsBit(val);
    }, `Expected javascript value to be either 0 or 1 but received ${val}`);
  });
};

const describeAssureJsValidIsBitDoesNotThrow = (valName: string, val: any) => {
  describe(`#assureJsValIsBit(${valName})`, () => {
    assert.doesNotThrow(() => {
      assureJsValIsBit(val);
    });
  });
};

describe("assureJsValIsBit", () => {
  describeAssureJsValIsBitThrows("2", 2);
  describeAssureJsValIsBitThrows("-1", -1);

  sampleFloatNumbers.concat(sampleNegativeFloatNumbers).forEach((n) => {
    describeAssureJsValIsBitThrows(n.toString(), n);
  });

  describeAssureJsValidIsBitDoesNotThrow("1", 1);
  describeAssureJsValidIsBitDoesNotThrow("0", 0);
});

const describeAssureJsValOfTypeThrows = (
  valName: string,
  val: any,
  typeName: PropJsType
) => {
  describe(`#assureJsValOfType(${valName}, ${typeName})`, () => {
    assertThrowsSqlite3DbError(() => {
      assureJsValOfType(val, typeName);
    }, `Expected javascript type ${typeName} but received ${typeof val}: ${val}`);
  });
};

const describeAssureJsValOfTypeDoesNotThrow = (
  valName: string,
  val: any,
  typeName: PropJsType
) => {
  describe(`#assureJsValOfType(${valName}, ${typeName})`, () => {
    it(`should not throw any errors`, () => {
      assert.doesNotThrow(() => {
        assureJsValOfType(val, typeName);
      });
    });
  });
};

describe("assureJsValOfType", () => {
  sampleFloatNumbers.concat(sampleNegativeFloatNumbers).forEach((n) => {
    describeAssureJsValOfTypeThrows(n.toString(), n, PropJsType.string);
  });

  describeAssureJsValOfTypeThrows("NaN", NaN, PropJsType.string);
  describeAssureJsValOfTypeThrows("0", 0, PropJsType.string);
  describeAssureJsValOfTypeThrows("-0", -0, PropJsType.string);

  sampleIntNumbers.concat(sampleNegativeIntNumbers).forEach((n) => {});

  describeAssureJsValOfTypeThrows("{}", {}, PropJsType.string);
  describeAssureJsValOfTypeThrows("[]", [], PropJsType.string);
  describeAssureJsValOfTypeThrows(
    `["a", "b", "c"]`,
    ["a", "b", "c"],
    PropJsType.string
  );
  describeAssureJsValOfTypeThrows('"true"', "true", PropJsType.boolean);
  describeAssureJsValOfTypeThrows('"false"', "false", PropJsType.boolean);
  describeAssureJsValOfTypeThrows('""', "", PropJsType.number);
  describeAssureJsValOfTypeThrows('"0"', "0", PropJsType.number);
  describeAssureJsValOfTypeThrows('"NaN"', "NaN", PropJsType.number);
  describeAssureJsValOfTypeThrows('"1"', "1", PropJsType.number);
  describeAssureJsValOfTypeThrows('"-1"', "-1", PropJsType.number);
  describeAssureJsValOfTypeThrows("true", true, PropJsType.number);
  describeAssureJsValOfTypeThrows("false", false, PropJsType.number);
  describeAssureJsValOfTypeThrows("true", true, PropJsType.object);
  describeAssureJsValOfTypeThrows("false", false, PropJsType.object);
  describeAssureJsValOfTypeThrows("0", 0, PropJsType.object);
  describeAssureJsValOfTypeThrows("-0", -0, PropJsType.object);
  describeAssureJsValOfTypeThrows("1", 1, PropJsType.object);
  describeAssureJsValOfTypeThrows('""', "", PropJsType.object);
  describeAssureJsValOfTypeThrows("NaN", NaN, PropJsType.object);

  Object.values(PropJsType).forEach((propJsType) => {
    describeAssureJsValOfTypeDoesNotThrow("null", null, propJsType);
    describeAssureJsValOfTypeDoesNotThrow("undefined", undefined, propJsType);
  });

  sampleFloatNumbers
    .concat(
      sampleNegativeFloatNumbers,
      sampleIntNumbers,
      sampleNegativeIntNumbers
    )
    .forEach((n) => {
      describeAssureJsValOfTypeThrows(n.toString(), n, PropJsType.boolean);
      describeAssureJsValOfTypeThrows(n.toString(), n, PropJsType.object);
      describeAssureJsValOfTypeThrows(
        n.toString(),
        n.toString(),
        PropJsType.boolean
      );
      describeAssureJsValOfTypeThrows(
        n.toString(),
        n.toString(),
        PropJsType.object
      );

      describeAssureJsValOfTypeThrows(n.toString(), n, PropJsType.string);
      describeAssureJsValOfTypeThrows(
        n.toString(),
        n.toString(),
        PropJsType.number
      );

      describeAssureJsValOfTypeDoesNotThrow(n.toString(), n, PropJsType.number);
      describeAssureJsValOfTypeDoesNotThrow(
        n.toString(),
        n.toString(),
        PropJsType.string
      );
    });

  describeAssureJsValOfTypeDoesNotThrow("NaN", NaN, PropJsType.number);
  describeAssureJsValOfTypeDoesNotThrow("0", 0, PropJsType.number);
  describeAssureJsValOfTypeDoesNotThrow("-0", -0, PropJsType.number);
  describeAssureJsValOfTypeDoesNotThrow("1", 1, PropJsType.number);
  describeAssureJsValOfTypeDoesNotThrow("-1", -1, PropJsType.number);
  describeAssureJsValOfTypeDoesNotThrow('"NaN"', "NaN", PropJsType.string);
  describeAssureJsValOfTypeDoesNotThrow('"0"', "0", PropJsType.string);
  describeAssureJsValOfTypeDoesNotThrow('"1"', "1", PropJsType.string);
  describeAssureJsValOfTypeDoesNotThrow('"-0"', "-0", PropJsType.string);
  describeAssureJsValOfTypeDoesNotThrow('"-1"', "-1", PropJsType.string);

  describeAssureJsValOfTypeDoesNotThrow("true", true, PropJsType.boolean);
  describeAssureJsValOfTypeDoesNotThrow("false", false, PropJsType.boolean);

  describeAssureJsValOfTypeDoesNotThrow("{}", {}, PropJsType.object);
  describeAssureJsValOfTypeDoesNotThrow("[]", [], PropJsType.object);
});

const describeAssureJsValIsIntThrows = (valName: string, val: number) => {
  describe(`#assureJsValIsInt(${valName})`, () => {
    assertThrowsSqlite3DbError(() => {
      assureJsValIsInt(val);
    }, `Expected javascript value to be an integer number but received ${val}`);
  });
};

const describeAssureJsValIsIntDoesNotThrow = (valName: string, val: number) => {
  describe(`#assureJsValIsInt(${valName})`, () => {
    it(`should not throw any errors`, () => {
      assert.doesNotThrow(() => {
        assureJsValIsInt(val);
      });
    });
  });
};

describe("assureJsValIsInt", () => {
  sampleFloatNumbers.concat(sampleNegativeFloatNumbers).forEach((n) => {
    describeAssureJsValIsIntThrows(n.toString(), n);
  });

  sampleIntNumbers.concat(sampleNegativeIntNumbers).forEach((n) => {
    describeAssureJsValIsIntDoesNotThrow(n.toString(), n);
  });
});

const describeAssureJsValIsPositiveNumberThrows = (
  valName: string,
  val: number,
  strictlyPositive?: boolean | null | undefined
) => {
  describe(`#assureJsValIsPositiveNumber(${valName}, ${strictlyPositive})`, () => {
    assertThrowsSqlite3DbError(() => {
      assureJsValIsPositiveNumber(val, strictlyPositive);
    }, `Expected javascript value to be positive number but received ${val}`);
  });
};

const describeAssureJsValIsStrictlyPositiveNumberThrows = (
  valName: string,
  val: number
) => {
  describe(`#assureJsValIsPositiveNumber(${valName}, true)`, () => {
    assertThrowsSqlite3DbError(() => {
      assureJsValIsPositiveNumber(val, true);
    }, `Expected javascript value to be strictly positive number but received ${val}`);
  });
};

const describeAssureJsValIsPositiveNumberDoesNotThrow = (
  valName: string,
  val: number,
  strictlyPositive?: boolean | null | undefined
) => {
  describe(`#assureJsValOfType(${valName}, ${strictlyPositive})`, () => {
    it(`should not throw any errors`, () => {
      assert.doesNotThrow(() => {
        assureJsValIsPositiveNumber(val, strictlyPositive);
      });
    });
  });
};

describe("assureJsValIsPositiveNumber", () => {
  sampleNegativeFloatNumbers.concat(sampleNegativeIntNumbers).forEach((n) => {
    describeAssureJsValIsPositiveNumberThrows(n.toString(), n);
  });

  sampleFloatNumbers.concat(sampleIntNumbers).forEach((n) => {
    describeAssureJsValIsPositiveNumberDoesNotThrow(n.toString(), n);
  });

  describeAssureJsValIsPositiveNumberThrows("-1", -1);
  describeAssureJsValIsPositiveNumberThrows("-1", -1, true);

  describeAssureJsValIsStrictlyPositiveNumberThrows("0", 0);
  describeAssureJsValIsStrictlyPositiveNumberThrows("-0", -0);

  describeAssureJsValIsPositiveNumberDoesNotThrow("0", 0);
  describeAssureJsValIsPositiveNumberDoesNotThrow("-0", -0);

  describeAssureJsValIsPositiveNumberDoesNotThrow("1", 1);
  describeAssureJsValIsPositiveNumberDoesNotThrow("1", 1, true);
});
