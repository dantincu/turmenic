export enum PropJsType {
  string = "string",
  boolean = "boolean",
  number = "number",
  object = "object",
}

export enum ColumnDbType {
  integer = "INTEGER",
  text = "TEXT",
  blob = "BLOB",
  real = "REAL",
  numeric = "NUMERIC",
}

export enum PropCustomType {
  dateTime = "dateTime",
}

export interface DateTime {
  value: Date;
  millis: number;
}

export interface DataTypeConvertor {
  propJsType: PropJsType;
  columnDbType: ColumnDbType;
  propCustomType?: PropCustomType | null | undefined;
  dbToJsVal: (dbVal: any) => any;
  jsToDbVal: (jsVal: any) => any;
}

export interface Sqlite3DbError {
  error: Error;
  isSqlite3DbError: boolean;
}

export const getSqlite3DbError = (error: Error) => {
  const sqlite3DbError: Sqlite3DbError = {
    error: error,
    isSqlite3DbError: true,
  };

  return sqlite3DbError;
};
