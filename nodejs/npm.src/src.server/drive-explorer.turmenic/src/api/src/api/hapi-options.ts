import {
  HapiCookieAuthOptions,
  HapiServerTtlOptions,
  HapiServerOptions,
  getServerOptions,
  DEFAULT_AUTH_COOKIE_TTL_MILLIS,
  ServerAuthSession,
  normializeOpts,
} from "../../src.node.common.server/api/hapi/index.js";

import { hapiServerOptionsCfg } from "../appSettings/moduleConfig.js";

export const APP_NAME = "api.drive-explorer.turmenic";

export const getHapiServerOptions = (): HapiServerOptions => {
  let opts = <HapiServerOptions>{
    appName: hapiServerOptionsCfg.appName ?? APP_NAME,
    address: hapiServerOptionsCfg.address,
    port: hapiServerOptionsCfg.port,
    tlsOptions: <HapiServerTtlOptions>{
      tlsCertRelPath: hapiServerOptionsCfg.tlsCertRelPath,
      tlsCertKeyRelPath: hapiServerOptionsCfg.tlsCertKeyRelPath,
    },
    addDefaultHomeRoute: true,
    addDefaultAuthRoute: true,
  };

  opts = normializeOpts(opts);

  const cookieAuthOptions = <HapiCookieAuthOptions>opts.cookieAuthOptions;
  cookieAuthOptions.authCookiePassword = hapiServerOptionsCfg.cookiePassword;

  return opts;
};
