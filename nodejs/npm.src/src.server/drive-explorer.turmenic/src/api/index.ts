import {
  envConfig,
  envBaseDir,
} from "./src.node.common/appSettings/envConfig.js";
import { start } from "./src/api/hapi-start.js";

const appEnv = await envConfig.appEnv.instance();
await start();
