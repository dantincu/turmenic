import path from "path";

import { appConsole } from "../../../../../../src.common/logging/appConsole.js";

import {
  envBaseDir,
  envConfig,
} from "../../../../../../src.node.common/appSettings/envConfig.js";

import {
  SafeUpdateOpts,
  TempEntryNameOpts,
} from "../../../../../../src.node.common/fileSystem/safe-update/safe-update.base.js";
import { makeDirSafeUpdate } from "../../../../../../src.node.common/fileSystem/safe-update/dir-safe-update.js";
import { makeFileSafeUpdate } from "../../../../../../src.node.common/fileSystem/safe-update/file-safe-update.js";

import {
  readFileAsync,
  writeFileAsync,
} from "../../../../../../src.node.common/fileSystem/types.js";

import { copyDirAsync } from "../../../../../../src.node.common/fileSystem/dir-hierarchy.js";

const appEnv = await envConfig.appEnv.instance();

const runTest1 = async () => {
  const dirPath = appEnv.getEnvRelPath(envBaseDir.temp, "dd");
  const entryName = "f1.txt";

  await makeFileSafeUpdate({
    parentDirPath: dirPath,
    entryName: entryName,
    updateFunc: async (nextPath) => {
      appConsole.log("nextPath", nextPath);

      const initialText = await readFileAsync(path.join(dirPath, entryName));
      await writeFileAsync(nextPath, `${initialText}z`);

      return true;
    },
  });
};

const runTest2 = async () => {
  const dirPath = appEnv.getEnvRelPath(envBaseDir.temp);
  const entryName = "dd";

  await makeDirSafeUpdate({
    parentDirPath: dirPath,
    entryName: entryName,
    updateFunc: async (nextPath) => {
      appConsole.log("nextPath", nextPath);
      await copyDirAsync(path.join(dirPath, entryName), nextPath);

      await writeFileAsync(path.join(nextPath, "out.txt"), new Date().toJSON());
      return true;
    },
  });
};

await runTest2();
