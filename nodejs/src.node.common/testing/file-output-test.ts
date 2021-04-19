import path from "path";

import { writeFileAsync } from "../fileSystem/types.js";
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

interface UnitTestsGroupExecOptsBase {
  testGroup: TestGroup;
  onMessageReceived?: ((msg: UnitTestMessage) => void) | null | undefined;
}

export interface UnitTestsGroupExecOpts extends UnitTestsGroupExecOptsBase {
  outputDirRelPath: string;
  outputFileExt?: string | null | undefined;
  outputMsgJoinChar?: string | null | undefined;
}

export interface UnitTestGroupExecNormOpts extends UnitTestsGroupExecOptsBase {
  outputDirPath: string;
  outputFileExt: string;
  outputMsgJoinChar: string;
}

const getNormalizedOpts = (
  opts: UnitTestsGroupExecOpts
): UnitTestGroupExecNormOpts => {
  const normOpts: UnitTestGroupExecNormOpts = {
    testGroup: opts.testGroup,
    outputFileExt: opts.outputFileExt ?? "out.txt",
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
    onMessageReceived: (msg) => {
      if (normOpts.onMessageReceived) {
        normOpts.onMessageReceived(msg);
      }
    },
  });

  await forEachAsync(testResultArr, async (testResult) => {
    const outputFilePath = path.join(
      normOpts.outputDirPath,
      [testResult.test.testName, normOpts.outputFileExt].join(".")
    );

    await writeFileAsync(
      outputFilePath,
      testResult.messageArr.join(normOpts.outputMsgJoinChar)
    );
  });
};
