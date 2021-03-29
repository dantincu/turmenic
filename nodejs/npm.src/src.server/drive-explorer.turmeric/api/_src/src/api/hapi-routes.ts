import Hapi from "@hapi/hapi";

import { HapiServerOptions } from "../../src.node.common.server/api/hapi/index.js";
import {
  getDefaultAuthRoute,
  getDefaultHomeRoute,
} from "../../src.node.common.server/api/hapi/server.js";

import { addDeviceAppDrivesRoutes } from "./device-app-drives/routes.js";

export const getRoutes = async (
  opts: HapiServerOptions
): Promise<Hapi.ServerRoute[]> => {
  const routes = <Hapi.ServerRoute[]>[];

  if (opts.addDefaultHomeRoute === true) {
    routes.push(
      getDefaultHomeRoute(opts, "Welcome to the Turmerik Drive Explorer Api")
    );
  }

  if (opts.addDefaultAuthRoute === true) {
    routes.push(getDefaultAuthRoute(opts));
  }

  addDeviceAppDrivesRoutes(routes, opts);

  return routes;
};
