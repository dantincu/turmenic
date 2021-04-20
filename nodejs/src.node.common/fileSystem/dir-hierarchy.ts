import path from "path";

import { normalizePath } from "./path.js";
import { forEachAsync } from "../../src.common/arrays/arrays-async.js";
import { readdirAsync } from "./types.js";
import { createDirIfNotExisting } from "./fileSystem.js";
import { getDirEntries } from "./getDirEntries.js";
import { appConsole } from "../../src.common/logging/appConsole.js";

export const cloneDirHierarchy = async (
  srcDirPath: string,
  destDirPath: string
) => {
  const srcSubDirNames = await getDirEntries(srcDirPath, {
    onlyDirs: true,
  });

  await forEachAsync(srcSubDirNames, async (srcSubDirName) => {
    const destSubDirPath = path.join(destDirPath, srcSubDirName);
    const srcSubDirPath = path.join(srcDirPath, srcSubDirName);

    await createDirIfNotExisting(destSubDirPath);
    await cloneDirHierarchy(srcSubDirPath, destSubDirPath);
  });
};

export const createDirPathRec = async (dirPath: string) => {
  if ((await createDirIfNotExisting(dirPath)) < 0) {
    const parentPath = path.join(
      ...normalizePath(dirPath)
        .split(/[\\\/]/g)
        .slice(0, -1)
    );

    await createDirPathRec(parentPath);
    await createDirIfNotExisting(dirPath);
  }
};
