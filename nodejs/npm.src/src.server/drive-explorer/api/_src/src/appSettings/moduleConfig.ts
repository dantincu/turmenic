import {
  ModuleConfig,
  ModuleConfigOptions,
  cfg,
} from "../../src.node.common/appSettings/moduleConfig.js";

export interface HapiServerTlsOptionsCfg {
  certRelPath: string;
  keyRelPath: string;
}

export interface HapiServerCorsOptionsCfg {
  allowedOrigins: string[];
}

export interface HapiServerOptionsCfg {
  appName?: string;
  address: string;
  port: number;
  tlsCert: boolean | HapiServerTlsOptionsCfg;
  cookiePassword: string;
  cors: HapiServerCorsOptionsCfg;
}

export const hapiServerOptionsCfg = <HapiServerOptionsCfg>(
  await cfg.getOrLoad({
    mn: "hapiServerOptions",
  })
).data;
