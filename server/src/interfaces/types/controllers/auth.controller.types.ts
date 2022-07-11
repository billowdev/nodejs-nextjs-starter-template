import { FastifyRequest } from "fastify";

export type IAuthLoginBodyRequest = FastifyRequest<{
  Body: {
    email: string;
    password: string;
  };
}>;

export type IAuthRegisterBodyRequest = FastifyRequest<{
  Body: {
    email: string;
    password: string;
    name: string;
    surname: string;
    phone: string;
  };
}>;

export interface IAuthLoginBodyResponse {
  id: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
  accessToken?: string;
}
