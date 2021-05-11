export const maxDate = (leftArg: Date, rightArg: Date) => {
  let retVal = leftArg;

  if (leftArg < rightArg) {
    retVal = rightArg;
  }

  return retVal;
};
