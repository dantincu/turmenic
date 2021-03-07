import {
  ModuleConfig,
  ModuleConfigOptions,
  cfg,
} from "../../src.node.common/appSettings/moduleConfig.js";

export interface HapiServerOptionsCfg {
  appName?: string;
  address: string;
  port: number;
  tlsCertRelPath: string;
  tlsCertKeyRelPath: string;
  cookiePassword: string;
}

export const hapiServerOptionsCfg = <HapiServerOptionsCfg>(
  await cfg.getOrLoad({
    mn: "hapiServerOptions",
  })
).data;
