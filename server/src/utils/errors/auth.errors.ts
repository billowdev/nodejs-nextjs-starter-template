import { CustomErrorParams } from "utils/customError";

export const AuthInvalidEmail: CustomErrorParams = {
  message: "Unauthorized",
  code: "AUTH001",
  statusCode: 401,
};

export const AuthInvalidPassword: CustomErrorParams = {
  message: "Unauthorized",
  code: "AUTH002",
  statusCode: 401,
};
export const AuthMissingHeaders: CustomErrorParams = {
  message: "Unauthorized",
  code: "AUTH003",
  statusCode: 401,
};

export const AuthJWTError: CustomErrorParams = {
  message: "Unauthorized",
  code: "AUTH004",
  statusCode: 401,
};
export const AuthRegisterFailure: CustomErrorParams = {
  message: "Register Failure",
  code: "AUTH005",
  statusCode: 401,
};

export default {
  AuthInvalidEmail,
  AuthInvalidPassword,
  AuthMissingHeaders,
  AuthJWTError,
  AuthRegisterFailure,
};
