import { strContainsDigits } from "../../src.common/text/utils.js";

export const getEnumStrKeys = (enumType: Object) => {
  const enumStrKeys = Object.keys(enumType).filter(
    (key) => strContainsDigits(key[0]) === false
  );

  return enumStrKeys;
};
