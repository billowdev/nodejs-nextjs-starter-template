import { FastifyInstance } from "fastify";
import { verifyToken } from "../middlewares";
import authController from "../controllers/auth.controller";
import { loginRouteSchema, registerRouteSchema, isAuthenticatedRouteSchema } from "./swaggerSchema/auth.route.schema";

const authRouter = async (app: FastifyInstance) => {
	app.post("/login", { schema: loginRouteSchema }, authController.handleLogin);
	app.post("/register",
		{ schema: registerRouteSchema },
		authController.handleRegister);

	app.get("/isauthenticated",
		{
			schema: isAuthenticatedRouteSchema,
			preHandler: [verifyToken],
		},

		authController.isAuthenticated
	)
}


export default authRouter;
