import { ServerOptions } from "@hapi/hapi";

import {
  EnvConfig,
  envBaseDir,
} from "../../../src.node.common/appSettings/envConfig.js";
import { appConsole } from "../../../src.common/logging/appConsole.js";
import { readFileAsync } from "../../../src.node.common/fileSystem/types.js";

export const DEFAULT_AUTH_COOKIE_TTL_MILLIS = 1000 * 3600 * 24 * 365;

export interface ServerAuthSession {
  appName: string;
}

export interface HapiServerTlsOptions {
  tlsCertRelPath: string;
  tlsCertKeyRelPath: string;
}

export interface HapiServerCorsOptions {
  allowedOrigins: string[];
}

export class HapiCookieAuthOptions {
  appSessionData: ServerAuthSession;
  authCookiePassword?: string;
  authValidateFunc?: (session: ServerAuthSession) => Promise<boolean>;
  isAuthCookieSecure: boolean;
  authCookieTtlMillis: number;
  authStrategyName: string;

  constructor(appSessionData: ServerAuthSession) {
    this.appSessionData = appSessionData;
    this.isAuthCookieSecure = true;
    this.authCookieTtlMillis = DEFAULT_AUTH_COOKIE_TTL_MILLIS;
    this.authStrategyName = "session";
  }
}

export interface HapiServerOptions {
  address: string;
  port: number;
  appName: string;
  cookieAuthOptions?: HapiCookieAuthOptions;
  tlsCert?: boolean | HapiServerTlsOptions;
  addDefaultHomeRoute?: boolean;
  addDefaultAuthRoute?: boolean;
  cors: HapiServerCorsOptions;
}

export const normializeOpts = (opts: HapiServerOptions): HapiServerOptions => {
  opts.cookieAuthOptions =
    opts.cookieAuthOptions ??
    new HapiCookieAuthOptions(<ServerAuthSession>{
      appName: opts.appName,
    });

  opts.cookieAuthOptions.authValidateFunc =
    opts.cookieAuthOptions.authValidateFunc ??
    (async (session: ServerAuthSession) => session.appName === opts.appName);

  opts.addDefaultHomeRoute = opts.addDefaultHomeRoute ?? false;
  opts.addDefaultAuthRoute = opts.addDefaultAuthRoute ?? false;

  return opts;
};

export const getServerOptions = async (
  envConfig: EnvConfig,
  opts: HapiServerOptions
) => {
  const serverOptions = <ServerOptions>{
    port: opts.port,
    address: opts.address,
  };

  if (opts.tlsCert) {
    if (typeof opts.tlsCert === "object") {
      const certFilePath = envConfig.getEnvRelPath(
        envBaseDir.config,
        <string>opts.tlsCert.tlsCertRelPath
      );

      const certKeyFilePath = envConfig.getEnvRelPath(
        envBaseDir.config,
        <string>opts.tlsCert.tlsCertKeyRelPath
      );

      serverOptions.tls = {
        cert: (await readFileAsync(certFilePath)).toString("utf8"),
        key: (await readFileAsync(certKeyFilePath)).toString("utf8"),
      };
    } else {
      serverOptions.tls = true;
    }
  }

  return serverOptions;
};
