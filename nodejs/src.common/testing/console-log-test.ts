import { appConsole } from "../logging/appConsole.js";

import { strReplaceAllWith } from "../text/utils.js";
import { generateConstantStr } from "../arrays/arr-const.js";
import { forEachAsync } from "../arrays/arrays-async.js";

export const defaultConstValues = Object.freeze({
  msgPartsDelimiter: " >>>> ",
});

export interface UnitTest {
  testId?: number | null | undefined;
  testName: string;
  testFunc: (opts: TestFuncOpts) => Promise<boolean>;
}

interface UnitTestComposite {
  test: UnitTest;
}

export interface TestResult extends UnitTestComposite {
  success: boolean;
  error: any | null;
  messageArr: TestMessage[];
}

export interface TestMessage {
  text: string;
}

export interface UnitTestMessage extends UnitTestComposite {
  message: TestMessage;
}

interface TestFuncBase {
  onMessageReceived: (msg: UnitTestMessage) => void;
  onUnhandledError: (err: any, msg: UnitTestMessage) => void;
}

export interface TestFuncOpts {
  onMessageReceived: (msg: TestMessage) => void;
  onUnhandledError: (err: any, msg: TestMessage) => void;
}

export interface TestGroup {
  allTests: UnitTest[];
  testNamePrefix?:
    | string
    | null
    | undefined /* like "test-{0:4}-". The first digit inside the curly braces should be 0 (zero) followed by a colon and then a second digit.
      The second digit specified inside the curly braces will result in as many leading zeros as padding. The curly braces should only appear once. */;
}

export interface UnitTestGroup extends TestFuncBase, TestGroup {}

export interface TestOpts extends UnitTestComposite, TestFuncBase {}

export interface PrintMainMsgOpts {
  msgParts: string[];
  msgArgs?: any[] | null | undefined;
  msgPartsDelimiter?: string | null | undefined;
  printNewLineBefore?: boolean | null | undefined;
  printNewLineAfter?: boolean | null | undefined;
}

const normalizeOpts = (opts: string[] | PrintMainMsgOpts) => {
  let retOpts: PrintMainMsgOpts =
    typeof (opts as string[]).length === "number"
      ? {
          msgParts: opts as string[],
        }
      : (opts as PrintMainMsgOpts);

  retOpts.msgArgs = retOpts.msgArgs ?? [];

  retOpts.msgPartsDelimiter =
    retOpts.msgPartsDelimiter ?? defaultConstValues.msgPartsDelimiter;

  retOpts.printNewLineBefore = retOpts.printNewLineBefore ?? true;
  retOpts.printNewLineAfter = retOpts.printNewLineAfter ?? true;

  return retOpts;
};

export const printMainMsg = (opts: string[] | PrintMainMsgOpts) => {
  opts = normalizeOpts(opts);

  const mainMsg = opts.msgParts.join(opts.msgPartsDelimiter as string);
  const msg = [opts.msgPartsDelimiter, mainMsg, opts.msgPartsDelimiter].join(
    ""
  );

  if (opts.printNewLineBefore) {
    appConsole.log();
  }

  appConsole.log(msg, ...(opts.msgArgs as any[]));

  if (opts.printNewLineAfter) {
    appConsole.log();
  }
};

export const printTestResult = (testResult: TestResult) => {
  printMainMsg([
    `TEST ${testResult.test.testName} ${
      testResult.success ? "SUCCEEDED" : "FAILED"
    }`,
  ]);
};

export const printTestError = (testResult: TestResult) => {
  printMainMsg({
    msgParts: [`TEST ${testResult.test.testName} CRASHED`],
    msgArgs: [testResult.error],
  });
};

export const runTestAsync = async (opts: TestOpts): Promise<TestResult> => {
  const testResult = {
    test: opts.test,
    success: false,
    error: null,
    messageArr: [],
  } as TestResult;

  printMainMsg([`TEST ${opts.test.testName} STARTED`]);

  try {
    testResult.success = await opts.test.testFunc({
      onMessageReceived: (msg) => {
        testResult.messageArr.push(msg);
        opts.onMessageReceived({
          message: msg,
          test: opts.test,
        });
      },
      onUnhandledError: (err, msg) => {
        opts.onUnhandledError(err, {
          message: msg,
          test: opts.test,
        });
      },
    });

    printTestResult(testResult);
  } catch (err) {
    testResult.success = false;
    testResult.error = err;

    printTestError(testResult);
  }

  printMainMsg([`TEST ${opts.test.testName} COMPLETED`]);
  return testResult;
};

const getTestNameNormalizer = (testGroup: UnitTestGroup) => {
  let normalizer = (test: UnitTest) => {
    return test.testName;
  };

  const testNamePrefix = testGroup.testNamePrefix ?? "test";

  if (testNamePrefix.length > 0) {
    const paddingStrLen = testGroup.allTests.length.toString().length;
    const paddingStr = generateConstantStr(paddingStrLen, "0");

    normalizer = (test: UnitTest) => {
      const prevTestName = test.testName;

      test.testName = `${testNamePrefix}-${(paddingStr + test.testId).slice(
        -paddingStrLen
      )}`;

      return prevTestName;
    };
  }

  return normalizer;
};

export const prepTestGroup = (testGroup: UnitTestGroup) => {
  const testNameNormalizer = getTestNameNormalizer(testGroup);

  testGroup.allTests.forEach((test, idx) => {
    test.testId = test.testId ?? idx + 1;
    testNameNormalizer(test);
  });
};

export const runAllTestsInOrderAsync = async (testGroup: UnitTestGroup) => {
  prepTestGroup(testGroup);
  const testResultArr: TestResult[] = [];

  await forEachAsync(testGroup.allTests, async (test, idx, arr) => {
    const testResult = await runTestAsync({
      test: test,
      onMessageReceived: testGroup.onMessageReceived,
      onUnhandledError: testGroup.onUnhandledError
    });

    testResultArr.push(testResult);
  });

  printMainMsg({
    msgParts: [`ALL TESTS SUMMARY`],
    msgPartsDelimiter: " \\\\\\\\ ==== //// ",
  });

  testResultArr.forEach((testResult) => {
    if (testResult.error) {
      printTestError(testResult);
    } else {
      printTestResult(testResult);
    }
  });

  return testResultArr;
};
