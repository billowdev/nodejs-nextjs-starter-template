import { FastifyInstance } from "fastify";
import articlesController from "../controllers/article.controller";
import { protectedRoutes } from "../middlewares";
import {
  getArticleRouteSchema,
  getArticleListRouteSchema,
  createArticleRouteSchema,
  updateArticleRouteSchema,
  deleteArticleRouteSchema,
  getAllArticleRouteSchema,
} from "./swaggerSchema/article.route.schema";

const articleRouter = async (app: FastifyInstance) => {
  // route api app.method("path", {option}, handler)

  app.get(
    "/",
    { schema: getAllArticleRouteSchema },
    articlesController.handleGetArticles
  );

  app.get(
    "/get",
    { schema: getArticleRouteSchema },
    articlesController.handleGetArticleById
  );

  app.get(
    "/get/author",
    { schema: getArticleListRouteSchema },
    articlesController.handleGetByAuthor
  );

  app.post(
    "/create",
    { schema: createArticleRouteSchema },
    articlesController.handleCreate
  );
  app.patch(
    "/update/:id",
    { schema: updateArticleRouteSchema },
    articlesController.handleUpdate
  );
  app.delete(
    "/delete/:id",
    { schema: deleteArticleRouteSchema },
    articlesController.handleDelete
  );

  // routes want to protect
  const Routes: object = {
    "/api/articles/get": false,
    "/api/articles": false,
    "/api/articles/get/author": true,
    "/api/articles/create": true,
    "/api/articles/update/:id": true,
    "/api/articles/delete/:id": true,
  };

  // function add hook onRequest -> protectedRoutes(appInstance, Routes you want to protect)
  protectedRoutes(app, Routes);
};

export default articleRouter;
