import { appConsole } from "../logging/appConsole.js";

import { strReplaceAllWith } from "../text/utils.js";
import { generateConstantStr } from "../arrays/arr-const.js";
import { forEachAsync } from "../arrays/arrays-async.js";

const defaultConstValues = Object.freeze({
  msgPartsDelimiter: " >>>> ",
});

export interface UnitTest {
  testId?: number | null | undefined;
  testName: string;
  testFunc: (opts: TestFuncOpts) => Promise<boolean>;
  onMessageReceived?: ((msg: UnitTestMessage) => void) | null | undefined;
  /* onUnhandledError?:
    | ((err: any, msg: UnitTestMessage) => void)
    | null
    | undefined; */
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
  // onUnhandledError: (err: any, msg: UnitTestMessage) => void;
}

export interface TestFuncOpts extends UnitTestComposite {
  onMessageReceived: (msg: UnitTestMessage) => void;
  // onUnhandledError: (err: any, msg: UnitTestMessage) => void;
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

interface PrintMainMsgOpts {
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

const printMainMsg = (opts: string[] | PrintMainMsgOpts) => {
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

const printTestResult = (testResult: TestResult) => {
  printMainMsg([
    `TEST ${testResult.test.testName} ${
      testResult.success ? "SUCCEEDED" : "FAILED"
    }`,
  ]);
};

const printTestError = (testResult: TestResult) => {
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
        testResult.messageArr.push(msg.message);
        (opts.test.onMessageReceived as (msg: UnitTestMessage) => void)(msg);
      },
      /* onUnhandledError: opts.test.onUnhandledError as (
        err: any,
        msg: UnitTestMessage
      ) => void,*/
      test: opts.test,
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
      )}-${prevTestName}`;

      return prevTestName;
    };
  }

  return normalizer;
};

const prepTestGroup = (testGroup: UnitTestGroup) => {
  const testNameNormalizer = getTestNameNormalizer(testGroup);

  testGroup.allTests.forEach((test, idx) => {
    test.testId = test.testId ?? idx + 1;
    testNameNormalizer(test);
    test.onMessageReceived =
      test.onMessageReceived ?? ((msg) => testGroup.onMessageReceived(msg));

    /* test.onUnhandledError =
      test.onUnhandledError ??
      ((err, msg) => testGroup.onUnhandledError(err, msg)); */
  });
};

export const runAllTestsInOrderAsync = async (testGroup: UnitTestGroup) => {
  prepTestGroup(testGroup);
  const testResultArr: TestResult[] = [];

  await forEachAsync(testGroup.allTests, async (test, idx, arr) => {
    const testResult = await runTestAsync({
      test: test,
      onMessageReceived: (msg) =>
        (test.onMessageReceived as (msg: UnitTestMessage) => void)(msg),
      /* onUnhandledError: (err, msg) =>
        (test.onUnhandledError as (err: any, msg: UnitTestMessage) => void)(
          err,
          msg
        ),*/
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

export const normalizeMessage = (msg: string | TestMessage) => {
  if (typeof msg === "string") {
    msg = {
      text: msg,
    };
  }

  return msg;
};

export const sendMessage = (opts: TestFuncOpts, msg: string | TestMessage) => {
  opts.onMessageReceived({
    test: opts.test,
    message: normalizeMessage(msg),
  });
};
