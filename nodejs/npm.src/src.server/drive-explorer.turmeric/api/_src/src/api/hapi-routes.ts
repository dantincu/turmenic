import Hapi from "@hapi/hapi";
import Cookie from "@hapi/cookie";

import {
  startServer,
  getServerWithCookieAuth,
  getDefaultAuthRoute,
  getDefaultHomeRoute,
  getCorsConfig,
} from "../../src.node.common.server/api/hapi/server.js";

import {
  DEFAULT_AUTH_COOKIE_TTL_MILLIS,
  normializeOpts,
  ServerAuthSession,
  getServerOptions,
  HapiServerOptions,
  HapiServerTlsOptions,
  HapiCookieAuthOptions,
} from "../../src.node.common.server/api/hapi/index.js";

import { getDeviceRootFolders } from "./api.js";

export const getRoutes = async (
  opts: HapiServerOptions
): Promise<Hapi.ServerRoute[]> => {
  const routes = <Hapi.ServerRoute[]>[];

  if (opts.addDefaultHomeRoute === true) {
    routes.push(
      getDefaultHomeRoute(opts, "Welcome to the Turmenic Drive Explorer Api")
    );
  }

  if (opts.addDefaultAuthRoute === true) {
    routes.push(getDefaultAuthRoute(opts));
  }

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

  return routes;
};
