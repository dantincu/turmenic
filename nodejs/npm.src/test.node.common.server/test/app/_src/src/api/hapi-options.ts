import { ServerOptions } from "@hapi/hapi";

import {
  envConfig,
  envBaseDir,
} from "../../src.node.common/appSettings/envConfig.js";
import { appConsole } from "../../src.common/logging/appConsole.js";
import { readFileAsync } from "../../src.node.common/fileSystem/types.js";

const appEnv = await envConfig.appEnv.instance();

const certFilePath = <string>(
  appEnv?.getEnvRelPath(envBaseDir.config, "ssl-cert", "cert.pem")
);

const certKeyFilePath = <string>(
  appEnv?.getEnvRelPath(envBaseDir.config, "ssl-cert", "key.pem")
);

export const serverOptions = <ServerOptions>{
  port: 4000,
  address: "localhost",
  tls: {
    key: (await readFileAsync(certKeyFilePath)).toString("utf8"),
    cert: (await readFileAsync(certFilePath)).toString("utf8"),
  },
};
