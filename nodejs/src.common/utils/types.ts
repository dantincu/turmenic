export const clone = <TObj extends {}>(obj: TObj) => {
  const clone = <TObj>{};

  for (const [key, value] of Object.entries(obj)) {
    clone[<keyof TObj>key] = <TObj[keyof TObj]>value;
  }

  return clone;
};

export const copyShallow = <TDest extends {}, TSrc extends {}>(
  dest: TDest,
  src: TSrc
) => {
  dest = dest ?? {};

  for (const [key, value] of Object.entries(src)) {
    dest[<keyof TDest>key] = <TDest[keyof TDest]>value;
  }

  return dest;
};
