import Hapi from "@hapi/hapi";
import Cookie from "@hapi/cookie";

import {
  envConfig,
  envBaseDir,
} from "../../src.node.common/appSettings/envConfig.js";

import { appLogger } from "../../src.node.common/logging/simple-file-logger.js";
import { serverOptions } from "./hapi-options.js";
import { hapiServerOptionsCfg } from "../appSettings/moduleConfig.js";

export const APP_NAME = "auth.drive-explorer.turmenic";
export const COOKIE_TTL_MILLIS = 1000 * 3600 * 24 * 365;

export interface CloudStoragePlatformAccount {
  accountEmail: string;
  accountPlatformKey: string;
}

export interface HapiServerAuthSession {
  appName: string;
  authenticatedAccounts: CloudStoragePlatformAccount[];
}

export const start = async () => {
  const server = Hapi.server(serverOptions);
  await server.register([Cookie]);

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: APP_NAME,
      password: hapiServerOptionsCfg.cookiePassword,
      isSecure: true,
      ttl: COOKIE_TTL_MILLIS,
    },
    redirectTo: "/login",
    validateFunc: async (request: any, session: HapiServerAuthSession) => {
      const isValid = session.appName === APP_NAME;

      if (!isValid) {
        return { valid: false };
      }

      return { valid: true };
    },
  });

  server.auth.default("session");

  server.route([
    {
      method: "GET",
      path: "/",
      handler: function (request, h) {
        return "Welcome to the Turmenic Drive Explorer api home page!";
      },
    },
    {
      method: "POST",
      path: "/auth",
      handler: async (request, h) => {
        request.cookieAuth.set({
          appName: APP_NAME,
          authenticatedAccounts: [],
        });
        request.cookieAuth.ttl(COOKIE_TTL_MILLIS);

        return h.redirect("/");
      },
      options: {
        auth: {
          mode: "try",
        },
      },
    },
  ]);

  await server.start();

  console.log("server running at: " + server.info.uri);
};
