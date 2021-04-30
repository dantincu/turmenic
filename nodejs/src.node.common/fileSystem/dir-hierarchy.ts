import path from "path";

import { normalizePath } from "./path.js";
import { forEachAsync } from "../../src.common/arrays/arrays-async.js";
import { readdirAsync, DirEntry, copyAsync } from "./types.js";
import { createDirIfNotExisting, isDirEntry } from "./fileSystem.js";
import { getDirEntries, getDirEntriesArr } from "./getDirEntries.js";
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

export const copyDirFiles = async (
  srcDirPath: string,
  fileNames: string[],
  destDirPath: string
) => {
  await forEachAsync(fileNames, async (fileName) => {
    const srcFilePath = path.join(srcDirPath, fileName);
    const destFilePath = path.join(destDirPath, fileName);

    await copyAsync(srcFilePath, destFilePath);
  });
};

export const copyDirAsync = async (srcDirPath: string, destDirPath: string) => {
  await createDirPathRec(destDirPath);
  const entriesArr = await getDirEntriesArr(srcDirPath);

  await copyDirFiles(
    srcDirPath,
    entriesArr
      .filter((entry) => entry.stats?.isFile())
      .map((entry) => entry.name),
    destDirPath
  );

  await forEachAsync(
    entriesArr
      .filter((entry) => entry.stats?.isDirectory())
      .map((entry) => entry.name),
    async (dirName) => {
      const srcSubDirPath = path.join(srcDirPath, dirName);
      const destSubDirPath = path.join(destDirPath, dirName);

      await copyDirAsync(srcSubDirPath, destSubDirPath);
    }
  );
};
