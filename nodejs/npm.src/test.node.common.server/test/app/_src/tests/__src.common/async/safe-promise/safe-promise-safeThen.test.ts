import { appConsole } from "../../../../src.common/logging/appConsole.js";
import {
  UnitTest,
  UnitTestGroup,
  sendMessage,
} from "../../../../src.common/testing/console-log-test.js";
import { runUnitTestsInOrderAsync } from "../../../../src.node.common/testing/file-output-test.js";

import { SafePromise } from "../../../../src.common/async/safe-promise.js";

const getUnitTest = (
  value: boolean,
  error: Error | null,
  reason: Error | null,
  thenValue: boolean,
  thenError: Error | null
) => {
  const unitTest: UnitTest = {
    testName: "safeThen",
    testFunc: async (opts) => {
      sendMessage(opts, "safePromise");

      const safePromise = new SafePromise<boolean>(null, (resolve, reject) => {
        sendMessage(opts, "safePromise executor");

        if (error !== null) {
          sendMessage(opts, "safePromise executor error");
          throw error;
        } else if (reason !== null) {
          sendMessage(opts, "safePromise executor reject");
          reject(reason);
        } else {
          sendMessage(opts, "safePromise executor resolve");
          resolve(value);
        }
      }).safeThen<boolean, boolean>({
        onfulfilled: async (val) => {
          sendMessage(opts, {
            text: `safeThen onfulfilled`,
            args: [val],
          });

          if (thenError) {
            sendMessage(opts, `safeThen onfulfilled error`);
            throw thenError;
          } else {
            sendMessage(opts, "safeThen onfulfilled resolve");
          }

          return thenValue;
        },
        onrejected: async (reason) => {
          sendMessage(opts, {
            text: `safeThen onrejected`,
            args: [reason],
          });

          if (thenError) {
            sendMessage(opts, `safeThen onrejected error`);
            throw thenError;
          } else {
            sendMessage(opts, "safeThen onrejected resolve");
          }

          return thenValue;
        },
        onfulfilledCrashed: (reason) => {
          sendMessage(opts, {
            text: `safeThen onfulfilledCrashed`,
            args: [reason],
          });
        },
      });

      const retVal = await safePromise.safeThen<boolean, boolean>({
        onfulfilled: (val) => {
          return thenValue;
        },
        onrejected: (rsn) => {
          return thenValue;
        },
      }).promise;

      console.log(`safePromise retVal ${retVal}\n`);
      sendMessage(opts, { text: `safePromise retVal`, args: [retVal] });

      return retVal;
    },
  };

  return unitTest;
};

const getUnitTestsArr = () => {
  const retArr: UnitTest[] = [
    getUnitTest(true, null, null, true, null),
    getUnitTest(true, null, null, false, null),
    getUnitTest(false, null, null, true, null),
    getUnitTest(true, new Error("safePromise error"), null, true, null),
    getUnitTest(true, null, new Error("safePromise reason"), true, null),
    getUnitTest(true, null, null, false, new Error("safethen error")),
  ];

  return retArr;
};

const runAllTests = async () => {
  const unitTestGroup = {
    allTests: getUnitTestsArr(),
    onMessageReceived: (msg) => {},
  } as UnitTestGroup;

  await runUnitTestsInOrderAsync({
    testGroup: unitTestGroup,
  });
};

await runAllTests();
