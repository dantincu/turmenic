import { nameof, NameofOptions } from "ts-simple-nameof";

import { GenericHash } from "../../../src.common/utils/types.js";
import {
  ColumnDbType,
  DateTime,
  PropJsType,
  PropCustomType,
} from "./db-types.js";

import { dbToJsVal, jsToDbVal } from "./db-types-validators.js";

export interface EntityPropMapping {
  propName: string;
  columnName: string;
  propJsType: PropJsType;
  columnDbType: ColumnDbType;
  propCustomType?: PropCustomType | null | undefined;
  defaultValue?: any | null | undefined;
  propIsRequired?: boolean | null | undefined;
}

export interface EntityMapping<TData> {
  tableName: string;
  propMappings: GenericHash<any>;
}

export abstract class EntityBase<TData> {
  data: TData;
  _entityMappings: EntityMapping<TData> | null;

  constructor(data: TData) {
    this.data = data;
    this._entityMappings = null;
  }

  public setProp<TVal>(propName: string, propVal: TVal) {
    this.data[propName] = propVal;
  }

  public getProp<TVal>(propName: string) {
    const propVal = this.data[propName] as TVal;
    return propVal;
  }

  public set<TVal>(
    prop: (obj: TData) => TVal,
    propVal: TVal,
    options?: NameofOptions
  ) {
    const propName = nameof(prop, options);
    this.setProp(propName, propVal);
  }

  public get<TVal>(prop: (obj: TData) => TVal, options?: NameofOptions) {
    const propName = nameof(prop, options);
    const propVal = this.getProp<TVal>(propName);

    return propVal;
  }

  public abstract getEntityMappings(): EntityMapping<TData>;

  public get entityMappings() {
    if (this._entityMappings === null) {
      this._entityMappings = this.getEntityMappings();
    }

    return this._entityMappings;
  }

  public getPropMappings<TMpp>(propName: string) {
    const propMappings = this.entityMappings.propMappings[propName] as TMpp;
    return propMappings;
  }

  public getMappings<TMpp>(
    prop: (obj: TData) => TMpp,
    options?: NameofOptions
  ) {
    const propName = nameof(prop, options);
    const propMappings = this.getPropMappings<TMpp>(propName);

    return propMappings;
  }
}
