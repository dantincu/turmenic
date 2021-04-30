import { nameof, NameofOptions } from "ts-simple-nameof";

import { GenericHash } from "../../../src.common/utils/types.js";
import {
  ColumnDbType,
  DateTime,
  PropJsType,
  PropCustomType,
} from "./db-types.js";

import { dbToJsVal, jsToDbVal } from "./db-types-validators.js";

export interface EntityPropTypeMapping {
  propJsType: PropJsType;
  columnDbType: ColumnDbType;
  propCustomType?: PropCustomType | null | undefined;
}

export interface EntityPropConstrMapping {
  defaultValue?: any | null | undefined;
  propIsRequired?: boolean | null | undefined;
}

export interface EntityPropTypeConstrMapping
  extends EntityPropTypeMapping,
    EntityPropConstrMapping {}

export interface EntityPropMapping extends EntityPropTypeConstrMapping {
  propName: string;
  columnName: string;
}

export interface EntityMapping<TData> {
  tableName: string;
  propMappings: GenericHash<EntityPropMapping>;
}

export abstract class EntityMappingBase<TData> implements EntityMapping<TData> {
  tableName: string;
  propMappings: GenericHash<EntityPropMapping>;

  constructor() {
    this.tableName = this.getTableName();

    this.propMappings = {};
    this.addPropMappings();
  }

  abstract getTableName(): string;
  abstract addPropMappings(): void;

  addEntityPropMapping(
    propName: string | ((o: TData) => any),
    propTypeConstrMapping: EntityPropTypeConstrMapping
  ) {
    const propMapping = addEntityPropMapping(
      this.propMappings,
      propName,
      propTypeConstrMapping
    );

    return propMapping;
  }

  addStringPropMapping(
    propName: string | ((o: TData) => any),
    propConstrMapping: EntityPropConstrMapping
  ) {
    const propMapping = addStringPropMapping(
      this.propMappings,
      propName,
      propConstrMapping
    );

    return propMapping;
  }

  addBooleanPropMapping(
    propName: string | ((o: TData) => any),
    propConstrMapping: EntityPropConstrMapping
  ) {
    const propMapping = addBooleanPropMapping(
      this.propMappings,
      propName,
      propConstrMapping
    );

    return propMapping;
  }

  addIntegerPropMapping(
    propName: string | ((o: TData) => any),
    propConstrMapping: EntityPropConstrMapping
  ) {
    const propMapping = addIntegerPropMapping(
      this.propMappings,
      propName,
      propConstrMapping
    );

    return propMapping;
  }

  addNumericPropMapping(
    propName: string | ((o: TData) => any),
    propConstrMapping: EntityPropConstrMapping
  ) {
    const propMapping = addNumericPropMapping(
      this.propMappings,
      propName,
      propConstrMapping
    );

    return propMapping;
  }

  addRealNumPropMapping(
    propName: string | ((o: TData) => any),
    propConstrMapping: EntityPropConstrMapping
  ) {
    const propMapping = addRealNumPropMapping(
      this.propMappings,
      propName,
      propConstrMapping
    );

    return propMapping;
  }

  addDatePropMapping(
    propName: string | ((o: TData) => any),
    propConstrMapping: EntityPropConstrMapping
  ) {
    const propMapping = addDatePropMapping(
      this.propMappings,
      propName,
      propConstrMapping
    );

    return propMapping;
  }
}

export const getPropName = <TData>(propName: string | ((o: TData) => any)) => {
  if (typeof propName === "function") {
    propName = nameof(propName);
  }

  return propName;
};

export const addEntityPropMapping = <TData>(
  propMappings: GenericHash<EntityPropMapping>,
  propName: string | ((o: TData) => any),
  propTypeConstrMapping: EntityPropTypeConstrMapping
) => {
  propName = getPropName(propName);
  const propMapping = propTypeConstrMapping as EntityPropMapping;

  propMapping.propName = propName;
  propMapping.columnName = propName;

  propMappings[propName] = propMapping;
  return propTypeConstrMapping;
};

export const addStringPropMapping = <TData>(
  propMappings: GenericHash<EntityPropMapping>,
  propName: string | ((o: TData) => any),
  propConstrMapping: EntityPropConstrMapping
) => {
  const propTypeConstrMapping = propConstrMapping as EntityPropTypeConstrMapping;

  propTypeConstrMapping.columnDbType = ColumnDbType.text;
  propTypeConstrMapping.propJsType = PropJsType.string;

  addEntityPropMapping(propMappings, propName, propTypeConstrMapping);
  return propTypeConstrMapping;
};

export const addBooleanPropMapping = <TData>(
  propMappings: GenericHash<EntityPropMapping>,
  propName: string | ((o: TData) => any),
  propConstrMapping: EntityPropConstrMapping
) => {
  const propTypeConstrMapping = propConstrMapping as EntityPropTypeConstrMapping;

  propTypeConstrMapping.columnDbType = ColumnDbType.integer;
  propTypeConstrMapping.propJsType = PropJsType.boolean;

  addEntityPropMapping(propMappings, propName, propTypeConstrMapping);
  return propTypeConstrMapping;
};

export const addIntegerPropMapping = <TData>(
  propMappings: GenericHash<EntityPropMapping>,
  propName: string | ((o: TData) => any),
  propConstrMapping: EntityPropConstrMapping
) => {
  const propTypeConstrMapping = propConstrMapping as EntityPropTypeConstrMapping;

  propTypeConstrMapping.columnDbType = ColumnDbType.integer;
  propTypeConstrMapping.propJsType = PropJsType.number;

  addEntityPropMapping(propMappings, propName, propTypeConstrMapping);
  return propTypeConstrMapping;
};

export const addNumericPropMapping = <TData>(
  propMappings: GenericHash<EntityPropMapping>,
  propName: string | ((o: TData) => any),
  propConstrMapping: EntityPropConstrMapping
) => {
  const propTypeConstrMapping = propConstrMapping as EntityPropTypeConstrMapping;

  propTypeConstrMapping.columnDbType = ColumnDbType.numeric;
  propTypeConstrMapping.propJsType = PropJsType.number;

  addEntityPropMapping(propMappings, propName, propTypeConstrMapping);
  return propTypeConstrMapping;
};

export const addRealNumPropMapping = <TData>(
  propMappings: GenericHash<EntityPropMapping>,
  propName: string | ((o: TData) => any),
  propConstrMapping: EntityPropConstrMapping
) => {
  const propTypeConstrMapping = propConstrMapping as EntityPropTypeConstrMapping;

  propTypeConstrMapping.columnDbType = ColumnDbType.real;
  propTypeConstrMapping.propJsType = PropJsType.number;

  addEntityPropMapping(propMappings, propName, propTypeConstrMapping);
  return propTypeConstrMapping;
};

export const addDatePropMapping = <TData>(
  propMappings: GenericHash<EntityPropMapping>,
  propName: string | ((o: TData) => any),
  propConstrMapping: EntityPropConstrMapping
) => {
  const propTypeConstrMapping = propConstrMapping as EntityPropTypeConstrMapping;

  propTypeConstrMapping.columnDbType = ColumnDbType.integer;
  propTypeConstrMapping.propJsType = PropJsType.object;
  propTypeConstrMapping.propCustomType = PropCustomType.dateTime;

  addEntityPropMapping(propMappings, propName, propTypeConstrMapping);
  return propTypeConstrMapping;
};

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

  public getPropMappings<TMpp extends EntityPropMapping>(propName: string) {
    const propMappings = this.entityMappings.propMappings[propName] as TMpp;
    return propMappings;
  }

  public getMappings<TMpp extends EntityPropMapping>(
    prop: (obj: TData) => TMpp,
    options?: NameofOptions
  ) {
    const propName = nameof(prop, options);
    const propMappings = this.getPropMappings<TMpp>(propName);

    return propMappings;
  }
}
