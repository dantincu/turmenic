import {
  HapiCookieAuthOptions,
  HapiServerTlsOptions,
  HapiServerOptions,
  getServerOptions,
  DEFAULT_AUTH_COOKIE_TTL_MILLIS,
  ServerAuthSession,
  normializeOpts,
} from "../../src.node.common.server/api/hapi/index.js";

import {
  hapiServerOptionsCfg,
  HapiServerTlsOptionsCfg,
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

export const getHapiServerOptions = (): HapiServerOptions => {
  let opts = <HapiServerOptions>{
    appName: hapiServerOptionsCfg.appName ?? APP_NAME,
    address: hapiServerOptionsCfg.address,
    port: hapiServerOptionsCfg.port,
    tlsCert: getHapiServerTlsOptions(hapiServerOptionsCfg.tlsCert),
    addDefaultHomeRoute: true,
    addDefaultAuthRoute: true,
  };

  opts = normializeOpts(opts);

  const cookieAuthOptions = <HapiCookieAuthOptions>opts.cookieAuthOptions;
  cookieAuthOptions.authCookiePassword = hapiServerOptionsCfg.cookiePassword;

  return opts;
};
