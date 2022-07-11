import { FastifyInstance } from "fastify";
import { usersController } from "../controllers";
import { protectedRoutes } from "../middlewares";
import { profileRouteSchema } from "./swaggerSchema/users.route.schema";

export const userRouter = async (app: FastifyInstance) => {
  app.get(
    "/profile",
    { schema: profileRouteSchema },
    usersController.handleUserProfile
  );

  // routes want to protect
  const Routes: object = {
    "/api/users/profile": true,
  };

  // function add hook onRequest -> protectedRoutes(appInstance, Routes you want to protect)
  protectedRoutes(app, Routes);
};

export default userRouter;
