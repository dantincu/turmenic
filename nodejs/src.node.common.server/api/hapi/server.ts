import Hapi from "@hapi/hapi";
import Cookie from "@hapi/cookie";
// @ts-ignore
import HapiCors from "hapi-cors";
import Boom from "@hapi/boom";

import {
  envConfig,
  envBaseDir,
} from "../../../src.node.common/appSettings/envConfig.js";

import { appLogger } from "../../../src.node.common/logging/simple-file-logger.js";
import {
  HapiServerOptions,
  HapiCookieAuthOptions,
  HapiServerTlsOptions,
  ServerAuthSession,
  getServerOptions,
  normializeOpts,
} from "./hapi.js";
import { appConsole } from "../../../src.common/logging/appConsole.js";

export const getServer = async (
  opts: HapiServerOptions
): Promise<Hapi.Server> => {
  opts = normializeOpts(opts);
  const appEnv = await envConfig.appEnv.instance();
  const serverOptions = await getServerOptions(appEnv, opts);

  const server = Hapi.server(serverOptions);
  await server.register([HapiCors]);

  return server;
};

export const getServerWithCookieAuth = async (
  opts: HapiServerOptions
): Promise<Hapi.Server> => {
  opts = normializeOpts(opts);
  const appEnv = await envConfig.appEnv.instance();
  const serverOptions = await getServerOptions(appEnv, opts);

  const cookieAuthOpts: HapiCookieAuthOptions = <HapiCookieAuthOptions>(
    opts.cookieAuthOptions
  );
  const authValidateFunc = <(session: ServerAuthSession) => Promise<boolean>>(
    cookieAuthOpts.authValidateFunc
  );

  const server = Hapi.server(serverOptions);
  await server.register([Cookie, HapiCors]);

  server.auth.strategy(cookieAuthOpts.authStrategyName, "cookie", {
    cookie: {
      name: opts.appName,
      password: cookieAuthOpts.authCookiePassword,
      isSecure: cookieAuthOpts.isAuthCookieSecure,
      ttl: cookieAuthOpts.authCookieTtlMillis,
      isSameSite: "None",
    },
    validateFunc: async (request: any, session: any) => {
      const isValid: boolean =
        (await authValidateFunc(<ServerAuthSession>session)) ?? false;

      return <Cookie.ValidateResponse>{ valid: isValid };
    },
  });

  server.auth.default(cookieAuthOpts.authStrategyName);
  return server;
};

export const getCorsConfig = (
  opts: HapiServerOptions
): Hapi.RouteOptionsCors => {
  const corsConfig: Hapi.RouteOptionsCors = {
    origin: opts.cors.allowedOrigins,
  };

  return corsConfig;
};

export const getDefaultHomeRoute = (
  opts: HapiServerOptions,
  homeRouteResponse?: string
): Hapi.ServerRoute => {
  const route = <Hapi.ServerRoute>{
    method: "GET",
    path: "/",
    options: {
      cors: getCorsConfig(opts),
    },
    handler: function (request, h) {
      return homeRouteResponse ?? "Api home page";
    },
  };

  return route;
};

export const getDefaultAuthRoute = (opts: HapiServerOptions) => {
  const route = <Hapi.ServerRoute>{
    method: "POST",
    path: "/auth",
    handler: async (request, h) => {
      const cookieAuthOpts: HapiCookieAuthOptions = <HapiCookieAuthOptions>(
        opts.cookieAuthOptions
      );
      request.cookieAuth.set(cookieAuthOpts.appSessionData);
      request.cookieAuth.ttl(cookieAuthOpts.authCookieTtlMillis);

      return h.response(<Hapi.ResponseValue>{
        authenticated: true,
      });
    },
    options: {
      auth: {
        mode: "try",
      },
      cors: getCorsConfig(opts),
    },
  };

  return route;
};

export const startServer = async (server: Hapi.Server) => {
  await server.start();

  appConsole.log("server running at: " + server.info.uri);
  return server;
};
