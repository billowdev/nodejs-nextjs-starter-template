import { FastifyRequest } from "fastify";
import { userService } from "../services";
import {
  IAuthLoginBodyRequest,
  IAuthRegisterBodyRequest,
} from "../interfaces/types/controllers/auth.controller.types";
import authErrors from "../utils/errors/auth.errors";
import customError from "../utils/customError";
import { IUserAttributes } from "../interfaces/types/models/user.model.types";

export const handleLogin = async (request: IAuthLoginBodyRequest) => {
  const { email, password } = request.body;
  const login = await userService.userLogin(email, password);
  return login;
};

export const handleRegister = async (
  request: IAuthRegisterBodyRequest
): Promise<IUserAttributes> => {
  const { email, password, name, surname, phone } = request.body;
  const user: IUserAttributes = await userService
    .createUser({
      email,
      password,
      name,
      surname,
      phone,
    })
    .catch((err) => {
      customError(authErrors.AuthRegisterFailure);
      throw new Error();
    });
  return user;
};


export const isAuthenticated = async (request: FastifyRequest) => {
  const { UserId } = request;
  const response = userService.userSession(UserId!);
  return response
}

export const loggedOut = async (request: FastifyRequest) => {
  return request.UserId
}

export default {
  handleLogin,
  handleRegister,
  isAuthenticated,
  loggedOut
};
