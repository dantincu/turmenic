import { nameof, NameofOptions } from "ts-simple-nameof";

import { GenericHash } from "../../../src.common/utils/types.js";
import { EntityBase, EntityMapping, EntityPropMapping } from "./entity.base.js";

export interface DbMetadata {
  dbVersion: string;
  timeStamp: Date;
  timeStampMillis: number;
}
