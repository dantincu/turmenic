import { strReplaceAll } from "../src.common/text/utils.js";

export const getAttrQuerySelector = (
  attrName: string,
  attrValue?: string | null | undefined
) => {
  let querySelector: string;
  attrName = strReplaceAll(attrName, '"', '\\"') as string;

  if (typeof attrValue !== "undefined" && attrValue !== null) {
    querySelector = `[${attrName}="${attrValue}"]`;
  } else {
    querySelector = `[${attrName}]`;
  }

  return querySelector;
};
