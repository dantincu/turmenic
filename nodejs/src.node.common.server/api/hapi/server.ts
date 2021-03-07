import Hapi from "@hapi/hapi";
import Cookie from "@hapi/cookie";

import {
  envConfig,
  envBaseDir,
} from "../../../src.node.common/appSettings/envConfig.js";

import { appLogger } from "../../../src.node.common/logging/simple-file-logger.js";
import {
  HapiServerOptions,
  HapiCookieAuthOptions,
  HapiServerTtlOptions,
  ServerAuthSession,
  getServerOptions,
  normializeOpts,
} from "./index.js";

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
  await server.register([Cookie]);

  server.auth.strategy(cookieAuthOpts.authStrategyName, "cookie", {
    cookie: {
      name: opts.appName,
      password: cookieAuthOpts.authCookiePassword,
      isSecure: cookieAuthOpts.isAuthCookieSecure,
      ttl: cookieAuthOpts.authCookieTtlMillis,
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

export const getDefaultHomeRoute = (
  homeRouteResponse?: string
): Hapi.ServerRoute => {
  const route = <Hapi.ServerRoute>{
    method: "GET",
    path: "/",
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
    },
  };

  return route;
};

export const startServer = async (server: Hapi.Server) => {
  await server.start();

  console.log("server running at: " + server.info.uri);
  return server;
};
