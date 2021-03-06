import assert from "assert";
import { describe, it } from "mocha";

import {
  PropJsType,
  Sqlite3DbError,
} from "../../../../src.node.common.server/sqlite3/entity-sql/db-types.js";

export const assertThrowsSqlite3DbError = (
  func: () => void,
  errMsg: string
) => {
  it(`should throw an error with message ${errMsg}`, () => {
    assert.throws(
      () => {
        func();
      },
      {
        isSqlite3DbError: true,
        error: new Error(errMsg),
      } as Sqlite3DbError
    );
  });
};

export const sampleIntNumbers = [2, 7, 12, 345];
export const sampleNegativeIntNumbers = sampleIntNumbers.map((n) => -n);

export const sampleFloatNumbers = [0.01, 0.037, 0.99, 1.01, 1.23, 123.456];
export const sampleNegativeFloatNumbers = sampleFloatNumbers.map((n) => -n);

export interface Product {
  id: number;
  name: string;
  price: number;
  discount: number;
}

export const sampleProductsArr: Product[] = [
  {
    id: 1,
    name: "OnePlus 9",
    price: 999.9,
    discount: 10,
  },
  {
    id: 2,
    name: "OnePlus 9 Pro",
    price: 1099.9,
    discount: 11.5,
  },
];
