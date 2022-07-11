import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store"
import { UserState } from "@/interfaces/types/store/slices/userSlices.types";
import * as authService from "@/services/authService"
import httpClient from "@/utils/httpClient";
import { AxiosRequestConfig } from "axios";
import Router from "next/router";

interface SignAction {
	email: string
	password: string
}

const initialState: UserState = {
	id: "",
	email: "",
	name: "",
	surname: "",
	phone: "",
	accessToken: "",
	isAuthenticated: false,
	isAuthenticating: true,
};

export const signIn = createAsyncThunk(
	"auth/signin",
	async (credential: SignAction) => {
		const resp = await authService.signIn(credential);

		if (resp.accessToken === "") {
			throw new Error("login failed");
		}
		// set access token
		httpClient.interceptors.request.use((config?: AxiosRequestConfig) => {
			if (config && config.headers) {
				config.headers["Authorization"] = `Bearer ${resp.accessToken}`;
			}
			return config;
		});
		return resp;
	}
)

export const signUp = createAsyncThunk(
	"user/signup",
	async (credential: SignAction) => {
		const response = await authService.signUp(credential);
		return response;
	}
);

export const signOut = createAsyncThunk("user/signout", async () => {
	await authService.signOut();
	Router.push("/auth/signin");
});

export const fetchSession = createAsyncThunk("user/fetchSession", async () => {
	const response = await authService.getSession();
	// set access token
	if (response) {
		httpClient.interceptors.request.use((config?: AxiosRequestConfig) => {
			if (config && config.headers && response.email) {
				config.headers["Authorization"] = `Bearer ${response.accessToken}`;
			}
			return config;
		});
	}
	return response;
});

export const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(signUp.fulfilled, (state, action) => {
			state.accessToken = "";
			state.email = action.payload.email;
			state.name = action.payload.name;
			state.surname = action.payload.surname;
			state.phone = action.payload.phone;
			state.isAuthenticated = false;
		});
		builder.addCase(signIn.fulfilled, (state, action) => {
			state.accessToken = action.payload.accessToken;
			state.email = action.payload.email;
			state.name = action.payload.name;
			state.surname = action.payload.surname;
			state.isAuthenticated = true;
			state.isAuthenticating = false;
		});
		builder.addCase(signIn.rejected, (state, action) => {
			state.accessToken = "";
			state.isAuthenticated = false;
			state.isAuthenticating = false;
			state.email = "";
			state.name = "";
			state.surname = "";
		});
		builder.addCase(fetchSession.fulfilled, (state, action) => {
			state.isAuthenticating = false;
			if (action.payload && action.payload.email && action.payload.accessToken) {
				state.accessToken = action.payload.accessToken;
				state.id = action.payload.id;
				state.email = action.payload.email;
				state.name = action.payload.name;
				state.surname = action.payload.surname;
				state.isAuthenticated = true;
			}
		});
		builder.addCase(signOut.fulfilled, (state, action) => {
			state.isAuthenticated = false;
			state.isAuthenticating = false;
			state.id = "";
			state.email = "";
			state.name = "";
			state.surname = "";
			state.accessToken = "";
			
		});
	}
})

export const userSelector = (store: RootState) => store.user;
export const isAuthenticatedSelector = (store: RootState): boolean =>
	store.user.isAuthenticated;
export const isAuthenticatingSelector = (store: RootState): boolean =>
	store.user.isAuthenticating;

export default userSlice.reducer;