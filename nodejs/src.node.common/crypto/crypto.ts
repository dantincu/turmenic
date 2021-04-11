import crypto from "crypto";

export const getStrMd5Hash = (str: string) => {
  const md5 = crypto.createHash("md5");
  const hash = md5.update(str).digest("hex");

  return hash;
};
