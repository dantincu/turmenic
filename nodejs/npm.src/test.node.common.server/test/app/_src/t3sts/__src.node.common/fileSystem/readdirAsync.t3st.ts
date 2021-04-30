import { appConsole } from "../../../src.common/logging/appConsole.js";

import {
  envConfig,
  envBaseDir,
} from "../../../src.node.common/appSettings/envConfig.js";

import { readDirIfExists } from "../../../src.node.common/fileSystem/fileSystem.js";

const appEnv = await envConfig.appEnv.instance();
const dirPath = appEnv.envBasePath;

const fileEntries = await readDirIfExists(dirPath as string);
appConsole.log("fileEntries", fileEntries);
