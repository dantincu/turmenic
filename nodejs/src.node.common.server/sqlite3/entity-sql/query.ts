import { nameof } from "ts-simple-nameof";
import { getDefaultTermAlias } from "../../../src.common/text/code.js";
import { DbTableBase, Sqlite3DbTableOpts, IDbTable } from "./db-table.js";

export class SelectFrom {
  table: IDbTable;
  alias: string;
  public joinClause: JoinClause | null;

  constructor(table: IDbTable, alias: string) {
    this.table = table;
    this.alias = alias;
    this.joinClause = null;
  }
}

export const getColumnIdentifier = <TData, TValue>(
  tableAlias: string,
  prop: (data: TData) => TValue
) => {
  const columnName = `${tableAlias}.${nameof(prop)}`;
  return columnName;
};

export class JoinClause {}

export enum SqlBoolOperator {
  equals = "=",
  greaterThan = ">",
  lowerThan = "<",
  different = "<>",
  and = "AND",
  or = "OR",
  in = "IN",
  exists = "EXISTS",
  notExists = "NOT EXISTS",
}

export class SqlBoolOperation {}

export class SqlQuery {
  params: any;

  constructor() {}
}
