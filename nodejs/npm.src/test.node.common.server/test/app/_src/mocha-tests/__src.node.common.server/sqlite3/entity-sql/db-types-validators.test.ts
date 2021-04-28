import assert from "assert";
import { describe, it, run } from "mocha";

import {
  assureJsValIsBit,
  jsToDbVal,
  getDataTypeConvertor,
  dbToJsVal,
  assureReqPropValid,
  assureJsValIsInt,
  isDbNull,
  assureJsValIsPositiveNumber,
  assureJsValOfType,
  convertJsValue,
} from "../../../../src.node.common.server/sqlite3/entity-sql/db-types-validators.js";

describe("Array", () => {
  describe("#indexOf()", () => {
    it("should return true when the value is null", () => {
      assert.strictEqual(isDbNull(null), true);
    });
  });
});
