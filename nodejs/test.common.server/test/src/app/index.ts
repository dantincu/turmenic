import { appConsole } from "./src.common/logging/appConsole.js";
import "./src.common/appSettings/appEnvAutoload.js";
import { envConfig, envBaseDir } from "./src.common/appSettings/envConfig.js";

appConsole.log(
  "test.common.server",
  envConfig.appEnv?.getEnvRelPath(envBaseDir.temp)
);
