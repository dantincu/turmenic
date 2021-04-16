import {
  HapiCookieAuthOptions,
  HapiServerTlsOptions,
  HapiServerOptions,
  getServerOptions,
  DEFAULT_AUTH_COOKIE_TTL_MILLIS,
  ServerAuthSession,
  normializeOpts,
  HapiServerCorsOptions,
} from "../../src.node.common.server/api/hapi/hapi.js";

import {
  hapiServerOptionsCfg,
  HapiServerTlsOptionsCfg,
  HapiServerCorsOptionsCfg,
} from "../appSettings/moduleConfig.js";

export const APP_NAME = "api.drive-explorer.turmenic";

export const getHapiServerTlsOptions = (
  tlsCertOpts: boolean | HapiServerTlsOptionsCfg
) => {
  let tlsCert: boolean | HapiServerTlsOptions = false;

  if (tlsCertOpts) {
    if (typeof tlsCertOpts === "object") {
      tlsCert = <HapiServerTlsOptions>{
        tlsCertRelPath: tlsCertOpts.certRelPath,
        tlsCertKeyRelPath: tlsCertOpts.keyRelPath,
      };
    } else {
      tlsCert = true;
    }
  }

  return tlsCert;
};

export const getHapiServerCorsOptions = (
  corsOpts: HapiServerCorsOptionsCfg
): HapiServerCorsOptions => {
  const opts: HapiServerCorsOptions = corsOpts;
  return opts;
};

export const getHapiServerOptions = (): HapiServerOptions => {
  let opts = <HapiServerOptions>{
    appName: hapiServerOptionsCfg.appName ?? APP_NAME,
    address: hapiServerOptionsCfg.address,
    port: hapiServerOptionsCfg.port,
    tlsCert: getHapiServerTlsOptions(hapiServerOptionsCfg.tlsCert),
    addDefaultHomeRoute: true,
    addDefaultAuthRoute: false,
    cors: getHapiServerCorsOptions(hapiServerOptionsCfg.cors),
  };

  opts = normializeOpts(opts);

  const cookieAuthOptions = <HapiCookieAuthOptions>opts.cookieAuthOptions;
  cookieAuthOptions.authCookiePassword = hapiServerOptionsCfg.cookiePassword;

  return opts;
};
