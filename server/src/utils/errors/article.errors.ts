import { CustomErrorParams } from "../customError";

export const ArticleInvalid: CustomErrorParams = {
  message: "ARTICLE INVALID REQUEST FAILURE",
  code: "ARTICLE001",
  statusCode: 400,
};

export const ArticleCreateFailure: CustomErrorParams = {
  message: "CREATE FAILURE",
  code: "ARTICLE002",
  statusCode: 400,
};

export const ArticleGetFailure: CustomErrorParams = {
  message: "ARTICLE GET FAILURE",
  code: "ARTICLE003",
  statusCode: 400,
};

export const ArticleUpdateFailure: CustomErrorParams = {
  message: "ARTICLE UPDATE FAILURE",
  code: "ARTICLE004",
  statusCode: 400,
};

export default {
  ArticleInvalid,
  ArticleCreateFailure,
  ArticleGetFailure,
  ArticleUpdateFailure,
};
