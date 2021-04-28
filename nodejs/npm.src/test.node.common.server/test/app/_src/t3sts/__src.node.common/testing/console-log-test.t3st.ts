import { appConsole } from "../../../src.common/logging/appConsole.js";

import { runAllTestsInOrderAsync } from "../../../src.common/testing/console-log-test.js";
import { getUnitTestGroup } from "./log-test.base.js";

const runTest = async () => {
  const unitTestGroup = await getUnitTestGroup();
  await runAllTestsInOrderAsync(unitTestGroup);
};

await runTest();
