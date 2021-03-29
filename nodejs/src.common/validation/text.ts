export const stringToBoolean = (strVal: string | null | undefined) => {
  const retVal = strVal?.toLowerCase() === true.toString();
  return retVal;
};

export const reqStrValIsValid = (strVal: string | null | undefined) => {
  const retVal = typeof strVal === "string" && strVal.length > 0;
  return retVal;
};
