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
  UnitTestGroup,
  UnitTestMessage,
} from "../../src.common/testing/console-log-test.js";
import { appConsole } from "../../src.common/logging/appConsole.js";

import { StckTrcyExtractor } from "../stacktracey/stacktracey.js";
import { getExc } from "../../src.common/async/safe-promise.js";

interface UnitTestsGroupExecOptsBase {
  testGroup: UnitTestGroup;
}

export interface UnitTestsGroupExecOpts extends UnitTestsGroupExecOptsBase {
  outputDirRelPath?: string | null | undefined;
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
    outputFileExt: opts.outputFileExt ?? "out.json",
    errorFileExt: opts.errorFileExt ?? "err.json",
    outputDirPath: appEnv.getEnvRelPath(
      envBaseDir.data,
      opts.outputDirRelPath ??
        new StckTrcyExtractor({}).get({
          ignoreCallingModule: 1,
        }).filteredEntries[0].devRelFilePath
    ),
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
  });

  const errToStr = (error: any): string => {
    const retStr = JSON.stringify(
      {
        caught: error,
        exc: getExc(error as Error),
      },
      null,
      "  "
    );

    return retStr;
  };

  const msgArrToStr = (msgArr: TestMessage[]) => {
    const retStr = JSON.stringify(msgArr, null, "  ");
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
