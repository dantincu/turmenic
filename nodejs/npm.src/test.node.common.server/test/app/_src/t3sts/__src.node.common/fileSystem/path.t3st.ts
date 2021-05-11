import path from "path";

import { appConsole } from "../../../../../../src.common/logging/appConsole.js";

import {
  envConfig,
  envBaseDir,
} from "../../../../../../src.node.common/appSettings/envConfig.js";

const appEnv = await envConfig.appEnv.instance();
let fsPath = appEnv.envBasePath as string;
fsPath = `${fsPath}\\`;

const runTest = async () => {
  appConsole.log("fsPath", fsPath);
  appConsole.log("path.basename(fsPath)", path.basename(fsPath));
  appConsole.log("path.dirname(fsPath)", path.dirname(fsPath));

  appConsole.log("path.basename('./')", path.basename("./"));
  appConsole.log("path.dirname('./')", path.dirname("./"));

  appConsole.log("path.basename('../')", path.basename("../"));
  appConsole.log("path.dirname('../')", path.dirname("../"));
};

await runTest();

/* OUTPUT:

importing env config module
fsPath [env-path]\Turmerik\nodejs\test.node.common.server.env\test\app\ENV\
path.basename(fsPath) ENV
path.dirname(fsPath) [env-path]\Turmerik\nodejs\test.node.common.server.env\test\app
path.basename('./') .
path.dirname('./') .
path.basename('../') ..
path.dirname('../') .

*/
