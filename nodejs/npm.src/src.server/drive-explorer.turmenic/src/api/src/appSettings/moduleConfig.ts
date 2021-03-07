import {
  ModuleConfig,
  ModuleConfigOptions,
  cfg,
} from "../../src.node.common/appSettings/moduleConfig.js";

export interface HapiServerOptions {
  address: string;
  port: number;
  tlsCertRelPath: string;
  tlsCertKeyRelPath: string;
  cookiePassword: string;
}

export const hapiServerOptionsCfg = <HapiServerOptions>await cfg.getOrLoad({
  mn: "hapiServerOptions",
});
