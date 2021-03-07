import Bcrypt from "bcrypt";

import {
  envConfig,
  envBaseDir,
} from "./src.node.common/appSettings/envConfig.js";
import { appConsole } from "./src.common/logging/appConsole.js";
import { start } from "./src/api/hapi-start.js";
import { appLogger } from "./src.node.common/logging/simple-file-logger.js";
import { startOAuth } from "./src/googleapis/sample.js";

appLogger.trace(
  "test.node.common.server",
  (await envConfig.appEnv?.instance())?.getEnvRelPath(envBaseDir.temp)
);

// start();
await startOAuth();

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

// const password = "myPassword";

/* 
let hash = await Bcrypt.hash(password, 10);
appConsole.log("hash", hash);
*/
// hash $2b$10$tPL/1Xbj1Z25i4kiBIEY6euWMosEfPvVFmekxZhC.d9RNziKQBsbO
// hash $2b$10$JtniJHps7YV6s/CMS9ZghOXQ2aP/.QtES8iZfclu67L/j11teHEF2

/* 
let comparisonResult = await Bcrypt.compare(
  password,
  "$2b$10$tPL/1Xbj1Z25i4kiBIEY6euWMosEfPvVFmekxZhC.d9RNziKQBsbO"
);

appConsole.log("comparisonResult", comparisonResult);

comparisonResult = await Bcrypt.compare(
  password,
  "$2b$10$JtniJHps7YV6s/CMS9ZghOXQ2aP/.QtES8iZfclu67L/j11teHEF2"
);

appConsole.log("comparisonResult", comparisonResult);
*/
