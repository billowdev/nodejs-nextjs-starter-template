import fastify, { FastifyRequest, FastifyServerOptions } from "fastify";
import { CustomError } from "utils/customError";
import config from "./config/config"
import fastifySwagger from "@fastify/swagger";
import { swaggerOption } from "./config/swagger";
import {authRouter, userRouter, articleRouter} from "./routes";

declare module "fastify" {
	interface FastifyRequest {
		UserId?: string;
	}
}

const App = (options: FastifyServerOptions) => {
	const app = fastify(options)

	app.register(require('@fastify/cors'), (instance) => {
		return (req:any, callback:any) => {
		  const corsOptions = {
			// This is NOT recommended for production as it enables reflection exploits
			origin: true
		  };
	  
		  // do not include CORS headers for requests from localhost
		  if (/^localhost$/m.test(req.headers.origin)) {
			corsOptions.origin = false
		  }
	  
		  // callback expects two parameters: error and options
		  callback(null, corsOptions)
		}
	  })

	// swagger api documentation
	app.register(fastifySwagger, swaggerOption.options);

	app.get("/", async () => "SERVER");
	app.register(authRouter, { prefix: "/api/auth" });
	app.register(userRouter, { prefix: "/api/users" });
	app.register(articleRouter, { prefix: "/api/articles" });

	app.setErrorHandler((error, request, reply) => {
		const customError: CustomError = error;
		reply.status(customError.statusCode || 500).send({
			error: {
				message: customError.message,
				code: customError.code,
				data: customError.data,
			}
		})
	})
	return app
}

export default App;