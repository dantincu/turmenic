import { appConsole } from "../../../src.common/logging/appConsole.js";

import {
  envBaseDir,
  envConfig,
} from "../../../src.node.common/appSettings/envConfig.js";

import {
  tryGetEntryStats,
  GetEntryStatsOpts,
} from "../../../src.node.common/fileSystem/types.js";

const appEnv = await envConfig.appEnv.instance();

const runTryGetEntryStatsTest = async (
  relPath: string,
  opts?: GetEntryStatsOpts | boolean | null | undefined
) => {
  const entryPath = appEnv.getEnvRelPath(envBaseDir.temp, relPath);
  const retVal = await tryGetEntryStats(entryPath, opts);

  appConsole.log("tryGetEntryStats", retVal);
};

const runTest = async () => {
  await runTryGetEntryStatsTest("");
  await runTryGetEntryStatsTest("asdf");
  await runTryGetEntryStatsTest("asdf", true);

  try {
    await runTryGetEntryStatsTest("asdf", false);
  } catch (err) {
    appConsole.error("runTryGetEntryStatsTest err", err);
  }
};

await runTest();
