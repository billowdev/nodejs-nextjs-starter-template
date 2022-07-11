import { FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";
import customError from "../utils/customError";
import config from "../config/config";
import { ITokenDecoded } from "../interfaces/types/middlewares/auth.middleware.types";
import authErrors from "../utils/errors/auth.errors";

export const validateHeadersAuth = (req: FastifyRequest): string => {
  const header: string | undefined = req.headers.authorization;
  if (!header) {
    customError(authErrors.AuthMissingHeaders);
  }
  const accessToken: string = header!.split(" ")[1];
  if (!accessToken) {
    customError(authErrors.AuthMissingHeaders);
  }
  return accessToken;
};

export const verifyToken = async (
  request: FastifyRequest
): Promise<boolean> => {
  try {
    const token = validateHeadersAuth(request);
    const decoded: ITokenDecoded = Object(
      verify(token, config.webtoken as string)
    );

    request.UserId = decoded.aud;
    return true;
  } catch (err) {
    customError(authErrors.AuthJWTError);
    return false;
  }
};

export default { verifyToken };
