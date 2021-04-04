export const utf8HexCodes4Digits = Object.freeze({
  tab: "0009",
});

export const hexCodeToJsChar = (hexCode: string) => {
  const code = parseInt(hexCode, 16);
  const char = String.fromCharCode(code);

  return char;
};

export const hexCodeToHtmlChar = (hexCode: string) => {
  const htmlChar = `&#${hexCode};`;
  return htmlChar;
};
