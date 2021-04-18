export interface EntityPropMapping {
  propName: string;
  propJsType: string;
  columnName?: string | null | undefined;
  columnDbType?: string | null | undefined;
  defaultValue?: any | null | undefined;
  propIsRequired?: boolean | null | undefined;
}

export abstract class EntityBase {}
