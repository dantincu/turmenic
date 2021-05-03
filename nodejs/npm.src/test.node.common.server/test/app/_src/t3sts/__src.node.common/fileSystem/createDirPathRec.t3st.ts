import path from "path";

import {
  mkdirAsync,
  emptyDirAsync,
  writeFileAsync,
} from "../../../../../../src.node.common/fileSystem/types.js";
import { createDirPathRec } from "../../../../../../src.node.common/fileSystem/dir-hierarchy.js";

import {
  envConfig,
  envBaseDir,
} from "../../../../../../src.node.common/appSettings/envConfig.js";
import { appConsole } from "../../../../../../src.common/logging/appConsole.js";
import { appLogger } from "../../../../../../src.node.common/logging/simple-file-logger.js";

appLogger.trace(
  "test.node.common.server ",
  (await envConfig.appEnv?.instance())?.getEnvRelPath(envBaseDir.temp)
);

process.on("unhandledRejection", (err) => {
  appConsole.log(err);
  process.exit(1);
});

const appEnv = await envConfig.appEnv.instance();

const runTest1 = async () => {
  const arr = [1, 2, 3, 4];
  appConsole.log("arr", arr);

  arr.sort((a, b) => a - b);
  appConsole.log("arr.sort((a, b) => a - b)", arr);
};

const runTest2 = async () => {
  const firstDirPath = appEnv.getEnvRelPath(envBaseDir.data, "asdf", "1234");

  try {
    await mkdirAsync(firstDirPath);
  } catch (err) {
    appConsole.error("mkdirAsync err", err);
  }

  const secondDirPath = appEnv.getEnvRelPath(envBaseDir.data, "1234");

  try {
    await mkdirAsync(secondDirPath);
    await mkdirAsync(secondDirPath);
  } catch (err) {
    appConsole.error("mkdirAsync err", err);
  }

  const thirdDirPath = appEnv.getEnvRelPath(envBaseDir.data, "5678", "asdf");
  await createDirPathRec(thirdDirPath);

  const fourthDirPath = appEnv.getEnvRelPath(envBaseDir.data, "ghjk");
  const fifthDirPath = path.join(fourthDirPath, "asdf", "1234");

  await createDirPathRec(fifthDirPath);
  await emptyDirAsync(fourthDirPath);

  const firstFilePath = path.join(fourthDirPath, "out.txt");
  await writeFileAsync(firstFilePath, (["asdfasdf"] as unknown) as string);
};

await runTest1();
await runTest2();
