import { appConsole } from "../../../../../../../src.common/logging/appConsole.js";
import {
  UnitTest,
  UnitTestGroup,
  sendMessage,
} from "../../../../../../../src.common/testing/console-log-test.js";
import { runUnitTestsInOrderAsync } from "../../../../../../../src.node.common/testing/file-output-test.js";

import {
  SafePromise,
  SafePromiseError,
  executeSafe,
  executeSafeWithVal,
  getSafePromise,
} from "../../../../../../../src.common/async/safe-promise.js";

const getSafePromiseUnitTest = (
  retVal: boolean,
  callback: () => void,
  value: string | null,
  reason?: any
) => {
  const unitTest: UnitTest = {
    testName: "getSafePromiseUnitTest",
    testFunc: async (opts) => {
      await getSafePromise<string>((resolve, reject) => {
        sendMessage(opts, `1234 ${value}`);

        if (callback) {
          callback();
        }

        if (typeof value === "string") {
          resolve(value);
        } else {
          reject(reason);
        }
      });

      return retVal;
    },
  };

  return unitTest;
};

const getExecuteSafeWithValUnitTest = (
  value: number,
  retVal: boolean,
  callback?: () => void,
  resolve?: () => void,
  reject?: () => void
) => {
  const unitTest: UnitTest = {
    testName: "executeSafeWithVal",
    testFunc: async (opts) => {
      executeSafeWithVal<number, string>(
        value,
        (val) => {
          sendMessage(opts, `executeSafeWithVal callback ${val}\n`);

          if (callback) {
            callback();
          }

          if (resolve) {
            resolve();
          }

          return val.toString();
        },
        (reason) => {
          sendMessage(opts, `unhandled executeSafe ${reason}`);

          if (reject) {
            reject();
          }
        }
      );

      return retVal;
    },
  };

  return unitTest;
};

const getExecuteSafeUnitTest = (
  retVal: boolean,
  callback?: () => void,
  resolve?: () => void,
  reject?: () => void
) => {
  const unitTest: UnitTest = {
    testName: "executeSafe",
    testFunc: async (opts) => {
      executeSafe(
        () => {
          sendMessage(opts, `executeSafe callback\n`);

          if (callback) {
            callback();
          }

          if (resolve) {
            resolve();
          }
        },
        (reason) => {
          sendMessage(opts, `unhandled executeSafe ${reason}`);

          if (reject) {
            reject();
          }
        }
      );

      return retVal;
    },
  };

  return unitTest;
};

const getUnitTestsArr = () => {
  const retArr: UnitTest[] = [
    getExecuteSafeUnitTest(true, () => {
      throw new Error("throw");
    }),
    getExecuteSafeUnitTest(
      true,
      () => {},
      () => {
        throw new Error("resolve");
      }
    ),
    getExecuteSafeUnitTest(
      false,
      () => {},
      () => {},
      () => {
        throw new Error("reject");
      }
    ),
    getExecuteSafeWithValUnitTest(3, true, () => {
      throw new Error("throw");
    }),
    getExecuteSafeWithValUnitTest(
      6,
      true,
      () => {},
      () => {
        throw new Error("resolve");
      }
    ),
    getExecuteSafeWithValUnitTest(
      9,
      true,
      () => {},
      () => {},
      () => {
        throw new Error("reject");
      }
    ),
    getSafePromiseUnitTest(true, () => {}, "asdf"),
    getSafePromiseUnitTest(
      true,
      () => {
        throw new Error("throw");
      },
      "asdf"
    ),
    getSafePromiseUnitTest(false, () => {}, "asdf"),
    getSafePromiseUnitTest(true, () => {}, null, new Error("error")),
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
