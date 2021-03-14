import { v4 as uuidV4 } from "uuid";

import { uuidToBase64 } from "./uuid-to-base64.js";

export const uStrId = (): string => {
  const uuid = uuidV4();
  const base64Uuid = uuidToBase64(uuid);

  return base64Uuid;
};
