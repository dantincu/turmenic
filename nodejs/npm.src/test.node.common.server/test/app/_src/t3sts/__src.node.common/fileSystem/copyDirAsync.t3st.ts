import { appConsole } from "../../../../../../src.common/logging/appConsole.js";

import {
  envBaseDir,
  envConfig,
} from "../../../../../../src.node.common/appSettings/envConfig.js";

import {
  copyDirAsync,
  copyDirFiles,
} from "../../../../../../src.node.common/fileSystem/dir-hierarchy.js";

const appEnv = await envConfig.appEnv.instance();

const runTest = async () => {
  const dirPath = appEnv.getEnvRelPath(envBaseDir.temp, "d");
  const copyDirPath = appEnv.getEnvRelPath(envBaseDir.temp, "dd");

  await copyDirAsync(dirPath, copyDirPath);
};

await runTest();
