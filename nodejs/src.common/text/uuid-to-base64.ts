export const BASE_64_CHARSET =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/";

export const BASE_16_CHARSET = "0123456789abcdef";

const encodeArrayToBase64 = (numbersArr: number[]): string => {
  const base64Arr: string[] = [];

  for (let i = 0; i < numbersArr.length; i++) {
    const num = numbersArr[i];

    let rest = num % 64;
    let div = Math.floor(num / 64);
    base64Arr.push(BASE_64_CHARSET[rest]);

    while (div > 0) {
      rest = div % 64;
      div = Math.floor(div / 64);
      base64Arr.push(BASE_64_CHARSET[rest]);
    }
  }

  const base64Str = base64Arr.join("");
  return base64Str;
};

export const uuidToBase64 = (
  uuid: string,
  allowedExtraChars?: string
): string => {
  uuid = uuid.toLowerCase();
  const throwIfNotAllowed = allowedExtraChars ? true : false;

  allowedExtraChars = allowedExtraChars ?? "";
  const numbersArr: number[] = [];

  let crntNum = 0;
  let crntNumIdx = 0;
  let crntNumPow = 1;
  for (let i = 0; i < uuid.length; i++) {
    const c = uuid[i];
    const idx = BASE_16_CHARSET.indexOf(c);

    if (idx >= 0) {
      crntNum += idx * crntNumPow;
      crntNumIdx++;
      crntNumPow *= 16;
    } else if (throwIfNotAllowed && allowedExtraChars.indexOf(c) < 0) {
      throw new Error(`Invalid uuid char ${c}`);
    }

    if (crntNumIdx === 6) {
      numbersArr.push(crntNum);
      crntNum = 0;
      crntNumIdx = 0;
      crntNumPow = 1;
    }
  }

  const base64Str = encodeArrayToBase64(numbersArr);
  return base64Str;
};
