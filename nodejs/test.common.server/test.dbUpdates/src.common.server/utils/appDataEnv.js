import path from 'path';
import process from 'process';

const getAppDataDirPath = () => {
    let appDataDirPath = process.env.APPDATA;

    if (!appDataDirPath) {
        if (process.platform == 'darwin') {
            appDataDirPath = process.env.HOME + '/Library/Preferences';
        } else {
            appDataDirPath = process.env.HOME + "/.local/share";
        }
    }

    return appDataDirPath;
}

export const appDataEnv = {
    appDataDirPath: getAppDataDirPath(),
    platformIsWindows: process.platform == "win32",
    getAppDataRelDirPath: (relDirPathPartsArr) => {
        let filePath = path.join.apply(path, [appDataEnv.appDataDirPath, ...relDirPathPartsArr]);
        return filePath;
    }
};
