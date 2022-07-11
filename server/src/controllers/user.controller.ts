import { FastifyRequest } from "fastify";
import { IAuthLoginBodyResponse } from "../interfaces/types/controllers/auth.controller.types";
import { userService } from "../services";

export const handleUserProfile = async (
  request: FastifyRequest
): Promise<IAuthLoginBodyResponse> => {
  const { UserId } = request;
  const user: IAuthLoginBodyResponse = await userService.getUserById(UserId!);
  return user;
};

export default {
  handleUserProfile,
};
