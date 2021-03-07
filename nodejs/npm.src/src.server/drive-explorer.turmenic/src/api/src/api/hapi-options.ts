import { ServerOptions } from "@hapi/hapi";

import {
  envConfig,
  envBaseDir,
} from "../../src.node.common/appSettings/envConfig.js";
import { appConsole } from "../../src.common/logging/appConsole.js";
import { readFileAsync } from "../../src.node.common/fileSystem/index.js";
import { hapiServerOptionsCfg } from "../appSettings/moduleConfig.js";

const appEnv = await envConfig.appEnv.instance();

const certFilePath = <string>(
  appEnv.getEnvRelPath(envBaseDir.config, hapiServerOptionsCfg.tlsCertRelPath)
);

const certKeyFilePath = <string>(
  appEnv.getEnvRelPath(
    envBaseDir.config,
    hapiServerOptionsCfg.tlsCertKeyRelPath
  )
);

export const serverOptions = <ServerOptions>{
  hapiServerOptionsport: hapiServerOptionsCfg.port,
  address: hapiServerOptionsCfg.address,
  tls: {
    key: (await readFileAsync(certKeyFilePath)).toString("utf8"),
    cert: (await readFileAsync(certFilePath)).toString("utf8"),
  },
};
