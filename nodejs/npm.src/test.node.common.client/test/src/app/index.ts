import { appConsole } from "./src.common/logging/appConsole.js";
import { envConfig, envBaseDir } from "./src.common/appSettings/envConfig.js";

appConsole.log(
  "test.common.server",
  (await envConfig.appEnv.instance()).getEnvRelPath(envBaseDir.temp)
);
