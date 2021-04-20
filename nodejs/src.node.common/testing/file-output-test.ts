import path from "path";
import fs from "fs";

import { writeFileAsync, emptyDirAsync } from "../fileSystem/types.js";
import { createDirPathRec } from "../fileSystem/dir-hierarchy.js";
import { envConfig, envBaseDir } from "../appSettings/envConfig.js";
import { forEachAsync } from "../../src.common/arrays/arrays-async.js";

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
} from "../../src.common/testing/console-log-test.js";
import { appConsole } from "../../src.common/logging/appConsole.js";

interface UnitTestsGroupExecOptsBase {
  testGroup: TestGroup;
  onMessageReceived?: ((msg: UnitTestMessage) => void) | null | undefined;
  onUnhandledError?:
    | ((err: any, msg: UnitTestMessage) => void)
    | null
    | undefined;
}

export interface UnitTestsGroupExecOpts extends UnitTestsGroupExecOptsBase {
  outputDirRelPath: string;
  outputFileExt?: string | null | undefined;
  errorFileExt?: string | null | undefined;
  outputMsgJoinChar?: string | null | undefined;
}

export interface UnitTestGroupExecNormOpts extends UnitTestsGroupExecOptsBase {
  outputDirPath: string;
  outputFileExt: string;
  errorFileExt: string;
  outputMsgJoinChar: string;
}

const getNormalizedOpts = (
  opts: UnitTestsGroupExecOpts
): UnitTestGroupExecNormOpts => {
  const normOpts: UnitTestGroupExecNormOpts = {
    testGroup: opts.testGroup,
    outputFileExt: opts.outputFileExt ?? "out.txt",
    errorFileExt: opts.errorFileExt ?? "err.txt",
    outputDirPath: appEnv.getEnvRelPath(envBaseDir.data, opts.outputDirRelPath),
    outputMsgJoinChar: opts.outputMsgJoinChar ?? "",
  };

  return normOpts;
};

const appEnv = await envConfig.appEnv.instance();

export const runUnitTestsInOrderAsync = async (
  opts: UnitTestsGroupExecOpts
) => {
  const normOpts = getNormalizedOpts(opts);

  const testResultArr = await runAllTestsInOrderAsync({
    ...normOpts.testGroup,
    onMessageReceived: normOpts.onMessageReceived ?? (() => {}),
    onUnhandledError: normOpts.onUnhandledError ?? (() => {}),
  });

  const errToStr = (error: any): string => {
    let err = error as Error;

    const retArr: string[] = [
      `ERR: ${err}\n`,
      `ERR NAME: ${err.name}\n`,
      `ERR MSG: ${err.message}\n`,
      `ERR STACK: ${err.stack}\n`,
    ];

    const retStr = retArr.join(normOpts.outputMsgJoinChar);
    return retStr;
  };

  const msgArrToStr = (msgArr: TestMessage[]) => {
    const retArr = msgArr.map((msg) => msg.text);

    const retStr = retArr.join(normOpts.outputMsgJoinChar);
    return retStr;
  };

  const writeTextToFile = async (
    testName: string,
    outputFileExt: string,
    message: string
  ) => {
    const outputFilePath = path.join(
      normOpts.outputDirPath,
      [testName, outputFileExt].join(".")
    );

    await writeFileAsync(outputFilePath, message);
  };

  await createDirPathRec(normOpts.outputDirPath);
  await emptyDirAsync(normOpts.outputDirPath);

  await forEachAsync(testResultArr, async (testResult) => {
    await writeTextToFile(
      testResult.test.testName,
      normOpts.outputFileExt,
      msgArrToStr(testResult.messageArr)
    );

    if (testResult.error) {
      await writeTextToFile(
        testResult.test.testName,
        normOpts.errorFileExt,
        errToStr(testResult.error)
      );
    }
  });
};
