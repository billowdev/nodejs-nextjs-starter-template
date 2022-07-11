import { FastifyInstance } from "fastify";
import { verifyToken } from "./auth.middleware";

export const protectedRoutes = async (
  app: FastifyInstance,
  routesToProtect: any
) => {
  app.addHook("onRequest", async (request, reply) => {
    try {
      const requestPath: string = request.routerPath;
      if (routesToProtect[requestPath]) {
        await verifyToken(request);
      }
    } catch (error) {
      reply.send(error);
    }
  });
};

export default { protectedRoutes };
