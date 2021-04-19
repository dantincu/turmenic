import { appConsole } from "../../../src.common/logging/appConsole.js";

import {
  TestFuncOpts,
  TestMessage,
  TestOpts,
  TestResult,
  runAllTestsInOrderAsync,
  UnitTest,
  TestGroup,
  UnitTestMessage,
  defaultConstValues,
  runTestAsync,
} from "../../../src.common/testing/console-log-test.js";

interface TestData {
  intVal: number;
}

interface BasicTestOpts {
  testName: string;
  success?: boolean;
  error?: any | null;
}

const getStartTestData = () => {
  const data: TestData = {
    intVal: 0,
  };

  return data;
};

const getBasicTest = (data: TestData, testOpts: BasicTestOpts) => {
  const unitTest: UnitTest = {
    testName: "basic increment",
    testFunc: async (funcOpts) => {
      data.intVal++;
      funcOpts.onMessageReceived({
        text: ("0000" + data.intVal).slice(-4),
      });

      if (testOpts.error) {
        throw testOpts.error;
      }

      return testOpts.success ?? true;
    },
  };

  return unitTest;
};

const runTest = async () => {
  const data = getStartTestData();

  await runAllTestsInOrderAsync({
    allTests: [
      getBasicTest(data, {
        testName: "Sample test that succeeds",
      }),
      getBasicTest(data, {
        testName: "Sample test that fails",
        success: false,
      }),
      getBasicTest(data, {
        testName:
          "Sample test that would have succeeded if it weren't for an error being thrown",
        error: new Error(
          "Sample error that makes this test fail, because otherwise this test would have succeeded"
        ),
      }),
      getBasicTest(data, {
        testName:
          "Sample test that would have failed even without an error being thrown",
        success: false,
        error: new Error(
          "Sample error that prevents this test to complete, though this test would have failed anyway, even without this error being thrown."
        ),
      }),
    ],
    onMessageReceived: (msg) => {
      appConsole.log(
        ` >>>> MSG FOR TEST ${msg.test.testName} >>>> `,
        msg.message
      );
    },
  });
};

await runTest();
