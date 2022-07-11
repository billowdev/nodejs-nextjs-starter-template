import {  IArticleModel } from "@/models/article.model"
import httpClient from "@/utils/httpClient"

export interface IArticleProps {
	id?: string;
	title: string;
	text: string;
}

export const requestArticleById = async (id: string) => {
	const { data: response } = await httpClient.get(
		`/articles/get?id=${id}`
	)
	return response
}

export const requestAllArticles = async () => {
	const { data: response } = await httpClient.get("/articles");
	return response.data
}

export const requestArticleByAuthor = async () => {
	const { data: response } = await httpClient.get("/articles/get/author");
	return response;
}

export const requestCreateArticles = async (article: IArticleProps) => {
	const { data: response } = await httpClient.post("/articles/create", article)
	return response
}

export const requestUpdateArticles = async (article: IArticleProps): Promise<void> => {
	const { data: response } = await httpClient.patch("/articles/update/" + article.id, article)
	return response
}

export const requestDeleteArticles = async (id: string): Promise<void> => {
	const { data: response } = await httpClient.delete("/articles/delete/" + id)
	return response
}



