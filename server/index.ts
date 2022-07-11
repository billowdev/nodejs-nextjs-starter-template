import { FastifyInstance, FastifyServerOptions } from "fastify"
import App from "./src/app"
import config from "./src/config/config"
import db from "./src/models"

const options: FastifyServerOptions = {
	logger: true
}

// Application
const app: FastifyInstance = App(options)

// serve
const PORT: string | number = config.port
db.sequelize.sync().then(() => {
	app.listen({port:Number(PORT)}, (err) => {
		if (err) {
			app.log.error(err);
			process.exit(1)
		}
		app.log.info(`server listening on ${PORT}`)
	})
})
