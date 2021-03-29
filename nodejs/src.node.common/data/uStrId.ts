import { v4 as uuidV4 } from "uuid";

import { uuidToBase64 } from "../../src.common/text/uuid-to-base64.js";
import { Idty, isIdtyType, assureAppIdty } from "../../src.common/data/idty.js";

export const uStrId = (): string => {
  const uuid = uuidV4();
  const base64Uuid = uuidToBase64(uuid);

  return base64Uuid;
};

export const assureUuid = (idty: Idty) => {
  let retVal = false;

  if (
    typeof idty.iid === "number" &&
    isNaN(idty.iid) === false &&
    idty.iid > 0
  ) {
    retVal = true;
    if (!idty.uuid) {
      idty.uuid = uStrId();
    }
  }

  return retVal;
};

export const assureUuidDeep = (obj: object) => {
  for (let key in obj) {
    let val = obj[key as keyof object] as any;
    if (typeof val === "object" && val !== null) {
      if (assureUuid(val as Idty) === false) {
        assureUuidDeep(val);
      }
    }
  }
};
