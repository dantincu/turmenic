import he from "he";

export const encodeHtml = (str: string) => {
  let encoded = "";

  if (str.length > 0) {
    encoded = he.encode(str);
  }

  return encoded;
};

export const encodeHtmlCheckNull = (str: string | null | undefined) => {
  let encoded = "";

  if (typeof str === "string" && str.length > 0) {
    encoded = he.encode(str);
  }

  return encoded;
};
