export interface UserState {
	id:string;
	email: string;
	name: string;
	surname: string;
	phone: string;
	isAuthenticated: boolean;
	isAuthenticating: boolean;
	accessToken: string;
	error?: string;
}

export interface SignInAction {
	username: string;
	password: string;
}

export interface SignUpAction {
	username: string;
	password: string;
	name: string;
	surname: string;
}