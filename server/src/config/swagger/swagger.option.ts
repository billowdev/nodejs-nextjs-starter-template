import fastify, { FastifyReply, FastifyRequest } from "fastify";
import config from "../config";

exports.options = {
  routePrefix: "/api/documentation",
  swagger: {
    info: {
      title: "node fastify app init - swagger",
      description: "Testing the Fastify swagger API",
      version: "1.0.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    host: `localhost:${config.port}`,
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
      { name: "user", description: "User related end-points" },
      { name: "article", description: "article related end-points" },
      { name: "auth", description: "auth related end-points" },
    ],
    securityDefinitions: {
      apiKey: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "JWT access token",
      },
    },
  },
  uiConfig: {
    // docExpansion: "full",
    deepLinking: true,
  },
  uiHooks: {
    // @ts-ignore
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request: any, reply: any, next: () => void) {
      next();
    },
  },
  staticCSP: true,
  // @ts-ignore
  transformStaticCSP: (header) => header,
  exposeRoute: true,
};
