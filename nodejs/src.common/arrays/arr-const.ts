export const generateRange = (length: number) => {
  const range = [...Array(length).keys()];
  return range;
};

export const generateConstantArr = <T>(length: number, val: T) => {
  const arr = [...Array(length).keys()].map((v) => val);
  return arr;
};

export const generateConstantStr = (
  length: number,
  char?: string | null | undefined,
  joinChar?: string | null | undefined
) => {
  char = char ?? "";
  joinChar = joinChar ?? "";

  const retStr = [...Array(length).keys()].map((v) => char).join(joinChar);
  return retStr;
};
