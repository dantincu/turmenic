import Hapi from "@hapi/hapi";

import { getCorsConfig } from "../../../src.node.common.server/api/hapi/server.js";
import { HapiServerOptions } from "../../../src.node.common.server/api/hapi/index.js";

import {
  getDeviceRootFolders,
  getDeviceAppDrives,
  addDeviceAppDrive,
} from "./api.js";

export const addDeviceAppDrivesRoutes = (
  routes: Hapi.ServerRoute[],
  opts: HapiServerOptions
) => {
  routes.push({
    method: "GET",
    path: "/device-root-folders",
    options: {
      cors: getCorsConfig(opts),
    },
    handler: async function (request, h) {
      const result = await getDeviceRootFolders(request.query.refresh);
      return result;
    },
  });

  routes.push({
    method: "GET",
    path: "/device-app-drives",
    options: {
      cors: getCorsConfig(opts),
    },
    handler: async function (request, h) {
      const result = await getDeviceAppDrives();
      return result;
    },
  });

  routes.push({
    method: "POST",
    path: "/add-device-app-drive",
    options: {
      cors: getCorsConfig(opts),
    },
    handler: async function (request, h) {
      await addDeviceAppDrive(request.payload.toString());
    },
  });
};
