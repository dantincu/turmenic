import { isLetter, isLowerLetter, isUpperLetter } from "./utils.js";

export const getDefaultTermAlias = (term: string) => {
  const termAlias = [
    term.charAt(0),
    ...term
      .substring(1)
      .split("")
      .filter(
        (letter, idx, arr) =>
          !isLetter(letter) ||
          isUpperLetter(letter) ||
          (idx > 0 && !isLetter(arr[idx - 1]))
      ),
  ]
    .join("")
    .toLowerCase();

  return termAlias;
};

export const getUniqueTermAlias = (term: string, existingAliases: string[]) => {
  let termAlias = getDefaultTermAlias(term);

  if (existingAliases.indexOf(termAlias) >= 0) {
    const defaultAlias = termAlias;
    let suffix = 1;

    termAlias = [defaultAlias, suffix.toString()].join("");

    while (existingAliases.indexOf(termAlias) >= 0) {
      suffix++;
      termAlias = [defaultAlias, suffix.toString()].join("");
    }
  }

  return termAlias;
};
