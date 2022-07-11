import { UserModel } from "./user.model"

export interface SignIn {
	id: string
	email: string
	name: string
	surname: string
	phone: string
	accessToken: string
	error?: string;
}

export interface SignUp {
	email: string
	password: string
	name: string
	surname: string
	phone: string
}


export interface GetSession {
	id:string,
	email:string,
	name:string,
	surname:string,
	accessToken:string,
	error?: string;
}