import Hapi from "@hapi/hapi";
import Bcrypt from "bcrypt";
import Cookie from "@hapi/cookie";
import Vision from "@hapi/vision";
import handlebars from "handlebars";

import {
  envConfig,
  envBaseDir,
} from "../../src.node.common/appSettings/envConfig.js";

import { appLogger } from "../../src.node.common/logging/simple-file-logger.js";
import { serverOptions } from "./hapi-options.js";

const users = [
  {
    username: "john",
    password: "$2b$10$JtniJHps7YV6s/CMS9ZghOXQ2aP/.QtES8iZfclu67L/j11teHEF2", // 'secret'
    name: "John Doe",
    id: "2133d32a",
  },
];

export const start = async () => {
  const server = Hapi.server(serverOptions);
  await server.register([Cookie, Vision]);

  server.views({
    engines: {
      html: handlebars,
    },
    defaultExtension: "html",
    path: "./src/api/static-files",
  });

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "test.common.server%test%app",
      password: "^crQ3SsnYPCYM6@bi7JYfz%ErPzrTrN%",
      isSecure: true,
    },
    redirectTo: "/login",
    validateFunc: async (request: any, session: any) => {
      const account = await users.find((user) => user.id === session.id);

      if (!account) {
        return { valid: false };
      }

      return { valid: true, credentials: account };
    },
  });

  server.auth.default("session");

  server.route([
    {
      method: "GET",
      path: "/",
      handler: function (request, h) {
        appLogger.trace(" >>>> TRACE >>>> ");
        return "Welcome to the restricted home page!";
      },
    },
    {
      method: "GET",
      path: "/login",
      handler: function (request, h) {
        return h.view("login");
      },
      options: {
        auth: false,
      },
    },
    {
      method: "POST",
      path: "/login",
      handler: async (request, h) => {
        const { username, password } = <{ username: string; password: string }>(
          request.payload
        );
        const account = users.find((user) => user.username === username);

        if (!account || !(await Bcrypt.compare(password, account.password))) {
          return h.view("./login");
        }

        request.cookieAuth.set({ id: account.id });
        request.cookieAuth.ttl(1000 * 3600 * 24 * 365);

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
