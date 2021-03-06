import process from "process";

const platformIsWindows = process.platform == "win32";

const matchUnixStyleAbsPathRegex = /^\/[a-zA-Z]/;
const matchWindowsStyleAbsPathRegex = /^[a-zA-Z]:/;

export const isAbsPath = (pathVal: string): boolean => {
  pathVal = pathVal.trim();

  let isAbs = !!pathVal.match(matchUnixStyleAbsPathRegex);
  isAbs = isAbs || !!pathVal.match(matchWindowsStyleAbsPathRegex);

  return isAbs;
};

export const isAbsPathWindowsStyle = (pathVal: string): boolean => {
  let match = !!pathVal.trim().match(matchWindowsStyleAbsPathRegex);
  return match;
};

export const isAbsPathUnixStyle = (pathVal: string): boolean => {
  let match = !!pathVal.trim().match(matchUnixStyleAbsPathRegex);
  return match;
};

export const windowsAbsPathToUnixStyle = (pathVal: string): string => {
  pathVal = pathVal.trim();

  pathVal = pathVal.replace(
    matchWindowsStyleAbsPathRegex,
    (match, offset, string) =>
      "/" + match.substring(match.length - 2, match.length - 1)
  );
  return pathVal;
};

export const unixAbsPathToWindowsStyle = (pathVal: string): string => {
  pathVal = pathVal.trim();

  pathVal = pathVal.replace(
    matchUnixStyleAbsPathRegex,
    (match, offset, string) => match.substring(match.length - 1) + ":"
  );
  return pathVal;
};

export const absPathToPlatformStyle = (pathVal: string): string => {
  if (platformIsWindows && isAbsPathUnixStyle(pathVal)) {
    pathVal = unixAbsPathToWindowsStyle(pathVal);
  } else if (platformIsWindows == false && isAbsPathWindowsStyle(pathVal)) {
    pathVal = windowsAbsPathToUnixStyle(pathVal);
  }

  return pathVal;
};
