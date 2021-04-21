import { appConsole } from "../../../../src.common/logging/appConsole.js";
import {
  UnitTest,
  UnitTestGroup,
  UnitTestMessage,
  TestResult,
  TestMessage,
  TestFuncOpts,
  TestGroup,
  TestOpts,
} from "../../../../src.common/testing/console-log-test.js";
import { runUnitTestsInOrderAsync } from "../../../../src.node.common/testing/file-output-test.js";

import {
  SafePromise,
  SafePromiseError,
  executeSafe,
  executeSafeWithVal,
  executeWithVal,
  getSafePromise,
} from "../../../../src.common/async/safe-promise.js";

const getUnitTestsArr = () => {
  const retArr: UnitTest[] = [
    {
      testName: "executeSafe",
      testFunc: async (opts) => {
        executeSafe(
          () => {},
          (reason) => {},
          (val) => {}
        );
        return true;
      },
    },
  ];

  return retArr;
};

const runAllTests = async () => {
  const unitTestGroup = {
    allTests: getUnitTestsArr(),
    onUnhandledError: (err, msg) => {},
    onMessageReceived: (msg) => {},
  } as UnitTestGroup;

  await runUnitTestsInOrderAsync({
    testGroup: unitTestGroup,
    outputDirRelPath:
      "tests\\_src.common\\async\\safe-promise\\safe-promise.test.ts",
  });
};

await runAllTests();
