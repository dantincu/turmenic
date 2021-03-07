import Hapi from "@hapi/hapi";
import Cookie from "@hapi/cookie";

import {
  startServer,
  getServerWithCookieAuth,
  getDefaultAuthRoute,
  getDefaultHomeRoute,
} from "../../src.node.common.server/api/hapi/server.js";

import {
  DEFAULT_AUTH_COOKIE_TTL_MILLIS,
  normializeOpts,
  ServerAuthSession,
  getServerOptions,
  HapiServerOptions,
  HapiServerTtlOptions,
  HapiCookieAuthOptions,
} from "../../src.node.common.server/api/hapi/index.js";

export const getRoutes = async (
  opts: HapiServerOptions
): Promise<Hapi.ServerRoute[]> => {
  const routes = <Hapi.ServerRoute[]>[];

  if (opts.addDefaultHomeRoute === true) {
    routes.push(
      getDefaultHomeRoute("Welcome to the Turmenic Drive Explorer Api")
    );
  }

  if (opts.addDefaultAuthRoute === true) {
    routes.push(getDefaultAuthRoute(opts));
  }

  return routes;
};
