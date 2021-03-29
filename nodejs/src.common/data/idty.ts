import { intIdGenerator } from "./intIdGenerator.js";

export interface Idty {
  iid: number; // internal app id
  uuid: string; // external unique persisted id
}

export const assureAppIdty = (
  idty: Idty,
  allUuids: { [key: string]: number }
) => {
  let retVal = false;

  if (idty.uuid) {
    retVal = true;
    if (typeof idty.iid !== "number" || isNaN(idty.iid)) {
      let iid = allUuids[idty.uuid];

      if (!iid) {
        iid = intIdGenerator.getNextId();
        allUuids[idty.uuid] = iid;
      }

      idty.iid = iid;
    }
  }

  return retVal;
};

export const isIdtyType = (idty: object) => {
  const retVal = idty.hasOwnProperty("iid") || idty.hasOwnProperty("uuid");
  return retVal;
};

export const assureObjAppIdtiesDeep = (
  obj: object,
  allUuids: { [key: string]: number }
) => {
  for (let key in obj) {
    let val = obj[key as keyof object] as any;
    if (typeof val === "object" && val !== null) {
      if (assureAppIdty(val as Idty, allUuids) !== true) {
        assureObjAppIdtiesDeep(val, allUuids);
      }
    }
  }
};

export const idtyEquals = (
  leftIdty?: Idty | null | undefined,
  rightIdty?: Idty | null | undefined
) => {
  let retVal = false;
  if (leftIdty && rightIdty) {
    retVal = !!leftIdty.iid && leftIdty.iid === rightIdty.iid;
    retVal = retVal || (!!leftIdty.uuid && leftIdty.uuid === rightIdty.uuid);
  }

  return retVal;
};

export const exportIdty = (idty: Idty) => {
  const retIdty = { idty } as any;
  delete retIdty.iid;

  return retIdty as Idty;
};

export const exportObjIdty = (obj: object) => {
  const retObj = { ...obj } as any;
  delete retObj.iid;

  return retObj as object;
};

export const exportObjIdtiesDeep = (obj: { [key: string]: any }) => {
  for (let key in obj) {
    let val = obj[key];
    if (typeof val === "object" && val !== null) {
      val = exportObjIdty(val);
      obj[key] = val;
    }
  }

  return obj;
};
