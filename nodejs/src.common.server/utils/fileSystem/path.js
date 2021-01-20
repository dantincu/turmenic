const path = require('path');
const process = require('process');

const platformIsWindows = process.platform == "win32";

const matchUnixStyleAbsPathRegex = /^\/[a-zA-Z]/;
const matchWindowsStyleAbsPathRegex = /^[a-zA-Z]:/;

const isAbsPath = (pathVal) => {
    pathVal = pathVal.trim();

    let isAbs = !!pathVal.match(matchUnixStyleAbsPathRegex);
    isAbs = isAbs || !!pathVal.match(matchWindowsStyleAbsPathRegex);

    return isAbs;
}

module.exports.isAbsPath = isAbsPath;

const isAbsPathWindowsStyle = (pathVal) => {
    let match = !!pathVal.trim().match(matchWindowsStyleAbsPathRegex);
    return match;
}

module.exports.isAbsPathWindowsStyle = isAbsPathWindowsStyle;

const isAbsPathUnixStyle = (pathVal) => {
    let match = !!pathVal.trim().match(matchUnixStyleAbsPathRegex);
    return match;
}

module.exports.isAbsPathUnixStyle = isAbsPathUnixStyle;

const windowsAbsPathToUnixStyle = (pathVal) => {
    pathVal = pathVal.trim();

    pathVal = pathVal.replace(matchWindowsStyleAbsPathRegex, (match, offset, string) => "/" + match.substring(match.length - 2, match.length - 1));
    return pathVal;
}

module.exports.windowsAbsPathToUnixStyle = windowsAbsPathToUnixStyle;

const unixAbsPathToWindowsStyle = (pathVal) => {
    pathVal = pathVal.trim();
    
    pathVal = pathVal.replace(matchUnixStyleAbsPathRegex, (match, offset, string) => match.substring(match.length - 1) + ":");
    return pathVal;
}

module.exports.unixAbsPathToWindowsStyle = unixAbsPathToWindowsStyle;

const absPathToPlatformStyle = (pathVal) => {
    if (platformIsWindows && isAbsPathUnixStyle(pathVal)) {
        pathVal = unixAbsPathToWindowsStyle(pathVal);
    } else if (platformIsWindows == false && isAbsPathWindowsStyle(pathVal)) {
        pathVal = windowsAbsPathToUnixStyle(pathVal);
    }

    return pathVal;
}

module.exports.absPathToPlatformStyle = absPathToPlatformStyle;
