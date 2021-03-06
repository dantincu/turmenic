import {
  startServer,
  getServerWithCookieAuth,
  getCorsConfig,
  getServer,
  getDefaultAuthRoute,
  getDefaultHomeRoute,
} from "../../src.node.common.server/api/hapi/server.js";

import {
  DEFAULT_AUTH_COOKIE_TTL_MILLIS,
  normializeOpts,
  ServerAuthSession,
  getServerOptions,
  HapiServerOptions,
  HapiServerTlsOptions,
  HapiCookieAuthOptions,
} from "../../src.node.common.server/api/hapi/hapi.js";

import { getHapiServerOptions } from "./hapi-options.js";
import { getRoutes } from "./hapi-routes.js";

import { assureUpToDate } from "./app-data.update.js";

export const start = async () => {
  await assureUpToDate();

  const opts = getHapiServerOptions();
  const server = await getServer(opts);
  const routes = await getRoutes(opts);

  server.route(routes);
  await startServer(server);

  return server;
};
