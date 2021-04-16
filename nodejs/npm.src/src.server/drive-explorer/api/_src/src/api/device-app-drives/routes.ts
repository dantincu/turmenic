import Hapi from "@hapi/hapi";

import { getCorsConfig } from "../../../src.node.common.server/api/hapi/server.js";
import { HapiServerOptions } from "../../../src.node.common.server/api/hapi/hapi.js";
import { handleResponse } from "../../../src.node.common.server/api/hapi/routes.js";

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
      const response = handleResponse(result, request, h);

      return response;
    },
  });

  routes.push({
    method: "GET",
    path: "/device-app-drives",
    options: {
      cors: getCorsConfig(opts),
    },
    handler: async function (request, h) {
      const result = await getDeviceAppDrives(request.query);
      const response = handleResponse(result, request, h);

      return response;
    },
  });

  routes.push({
    method: "POST",
    path: "/add-device-app-drive",
    options: {
      cors: getCorsConfig(opts),
    },
    handler: async function (request, h) {
      const result = await addDeviceAppDrive(request.payload);
      const response = handleResponse(result, request, h);

      return response;
    },
  });
};
