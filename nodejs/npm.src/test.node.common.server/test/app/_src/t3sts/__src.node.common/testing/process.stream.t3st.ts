import { appConsole } from "../../../src.common/logging/appConsole.js";

import { getCallingModuleRelFilePath } from "../../../src.node.common/stacktracey/stacktracey.js";
import { redirectStdStreams } from "../../../src.node.common/testing/process.stream.js";

await redirectStdStreams({
  outputDirRelPath: getCallingModuleRelFilePath(),
});

appConsole.log("asdfasdf");
