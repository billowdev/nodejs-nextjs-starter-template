import { GetSession, SignIn, SignUp } from "@/models/auth.model"
import httpClient from "@/utils/httpClient";
import axios from "axios";
import { METHODS } from "http";

type signProps = {
	email: string;
	password: string;
};

// next local api
export const signIn = async (user: signProps): Promise<SignIn> => {
	const { data: response } = await httpClient.post<SignIn>(
		`/user/auth/signin`,
		user,
		{
			baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
		}
	);
	return response;
};

// next local api
export async function signOut() {
	const response = await httpClient.get(`/user/auth/signout`, {
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
	});
	return response.data;
}

// server api
export const signUp = async (user: signProps): Promise<SignUp> => {
	const response = await httpClient.post<SignUp>("/auth/register", user);
	return response.data;
};


// next local api
export const getSession = async (): Promise<GetSession> => {
	const response = await httpClient.get(`/user/auth/session`, {
		baseURL: process.env.NEXT_PUBLIC_BASE_URL_LOCAL_API,
	});

	return response.data;
};