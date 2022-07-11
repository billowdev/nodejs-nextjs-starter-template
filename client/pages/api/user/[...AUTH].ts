import {
	HTTP_METHOD_POST,
	HTTP_METHOD_GET,
	ACCESS_TOKEN_KEY,
} from "@/utils/constant";

import { clearCookie, setCookie } from "@/utils/cookiesUtil";
import httpClient from "@/utils/httpClient";
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { store } from "@/store/store";
import { fetchSession } from "@/store/slices/userSlice";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const action = req.query["AUTH"][1];
	if (req.method === HTTP_METHOD_POST && action === "signin") {
		return signIn(req, res);
	} else if (req.method === HTTP_METHOD_GET && action === "signout") {
		return signOut(req, res);
	} else if (req.method === HTTP_METHOD_GET && action === "session") {
		return getSession(req, res);
	} else {
		return res
			.status(405)
			.end(`Error: HTTP ${req.method} is not supported for ${req.url}`);
	}
}

const signIn = async (req: NextApiRequest, res: NextApiResponse<any>) => {
	try {
		const response = await httpClient.post(`/auth/login`, req.body);

		const { accessToken } = response.data;
		setCookie(res, ACCESS_TOKEN_KEY, accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			sameSite: "strict",
			path: "/",
		});
		res.json(response.data);
	} catch (error: any) {
		res.status(400).end();
	}
}

const getSession = async (req: NextApiRequest, res: NextApiResponse<any>) => {
	try {
		const cookies = cookie.parse(req.headers.cookie || "");
		const accessToken = cookies[ACCESS_TOKEN_KEY];
		if (accessToken) {
			const response = await httpClient.get(`/auth/isauthenticated`, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			res.json(response.data);
		} else {
			res.json({ success: false, msg: "something wentwrong" });
		}
	} catch (error: any) {
		res.json({ success: false, msg: "something wentwrong" });
	}
}

const signOut = async (req: NextApiRequest, res: NextApiResponse<any>) => {
	clearCookie(res, ACCESS_TOKEN_KEY);
	res.json({ success: true, msg: "sign out successfuly" });
}
