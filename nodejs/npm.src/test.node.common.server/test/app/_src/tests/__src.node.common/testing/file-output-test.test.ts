import { appConsole } from "../../../src.common/logging/appConsole.js";

import { runUnitTestsInOrderAsync } from "../../../src.node.common/testing/file-output-test.js";
import { getUnitTestGroup } from "./log-test.base.js";

const runTest = async () => {
  const unitTestGroup = await getUnitTestGroup();
  await runUnitTestsInOrderAsync({
    testGroup: unitTestGroup,
    outputDirRelPath: "./tests/__src.node.common/testing/file-log-test.test",
  });
};

try {
  await runTest();
} catch (err) {
  appConsole.error(err);
}
