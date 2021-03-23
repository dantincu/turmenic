export const contains = <T>(arr: T[], item: T) => {
  const found = arr.indexOf(item) >= 0;
  return found;
};
