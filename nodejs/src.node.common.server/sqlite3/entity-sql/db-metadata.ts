import { nameof, NameofOptions } from "ts-simple-nameof";

import { GenericHash } from "../../../src.common/utils/types.js";
import { EntityBase, EntityMapping, EntityMappingBase } from "./entity.base.js";
import { DateTime } from "./db-types.js";

export interface DbMetadata {
  dbVersion: string;
  timeStamp: DateTime;
}

export class DbMetadataEntityMappings extends EntityMappingBase<DbMetadata> {
  constructor() {
    super();
  }

  public static readonly TABLE_NAME = "DbMetadata";

  getTableName() {
    return DbMetadataEntityMappings.TABLE_NAME;
  }

  addPropMappings() {
    this.addStringPropMapping((o) => o.dbVersion, {
      propIsRequired: true,
    });

    this.addDatePropMapping((o) => o.timeStamp, {
      propIsRequired: true,
    });
  }
}

export class DbMetadataEntity extends EntityBase<DbMetadata> {
  constructor(data: DbMetadata) {
    super(data);
  }

  public getEntityMappings(): EntityMapping<DbMetadata> {
    throw new Error("Method not implemented.");
  }
}
