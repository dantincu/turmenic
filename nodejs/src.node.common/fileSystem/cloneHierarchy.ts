import path from "path";

import { forEachAsync } from "../../src.common/arrays/arrays-async.js";
import { readdirAsync } from "./types.js";
import { createDirIfNotExisting } from "./fileSystem.js";
import { getDirEntries } from "./getDirEntries.js";

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
