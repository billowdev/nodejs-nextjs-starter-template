import { ArticleState } from "@/interfaces/types/store/slices/articleSlice.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as articleService from "@/services/articleService";
import { IArticleModel, IArticleModelWithUser } from "@/models/article.model";
import { RootState } from "../store";

const initialState: ArticleState = {
	articleAuthor: [],
	article: undefined,
	articles: [],
	error: "",
};

export const fetchArticleById = createAsyncThunk(
	"articles/by-id",
	async (id: string) => {
		const response = await articleService.requestArticleById(id)
		return response;
	}

)

export const fetchArticleByAuthor = createAsyncThunk(
	"articles/by-author",
	async () => {
		const response = await articleService.requestArticleByAuthor();
		return response
	}
)

export const fetchAllArticles = createAsyncThunk(
	"articles/fetch",
	async () => {
		const response = await articleService.requestAllArticles();
		return response
	}
)

export const createArticles = createAsyncThunk(
	"articles/create",
	async (article: articleService.IArticleProps) => {
		const response: IArticleModel = await articleService.requestCreateArticles(article);
		return response
	}
)

export const updateArticles = createAsyncThunk(
	"articles/update",
	async (article: articleService.IArticleProps) => {
		const response = await articleService.requestUpdateArticles(article);
		return response
	}
)

export const deleteArticles = createAsyncThunk(
	"articles/delete",
	async (id: string) => {
		const response = await articleService.requestDeleteArticles(id);
		return response
	}
)

export const articleSlice = createSlice({
	name: "article",
	initialState: initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(fetchArticleById.fulfilled, (state, action) => {
			state.article = action.payload;
		})

		builder.addCase(fetchArticleById.rejected, (state, action) => {
			state.article = undefined;
		})
		builder.addCase(fetchArticleByAuthor.fulfilled, (state, action) => {
			state.articleAuthor = action.payload.data;
		})

		builder.addCase(fetchArticleByAuthor.rejected, (state, action) => {
			state.articleAuthor = undefined;
		})

		builder.addCase(fetchAllArticles.fulfilled, (state, action) => {
			state.articles = action.payload;
		})

		builder.addCase(fetchAllArticles.rejected, (state, action) => {
			state.articles = [];
		})

		builder.addCase(createArticles.fulfilled, (state, action) => {
			state.article = action.payload
		})


	}
})

export const articleAuthorSelector = (store: RootState): IArticleModel[] | undefined => store.article.articleAuthor;
export const articlesSelector = (store: RootState): IArticleModelWithUser[] | undefined => store.article.articles;

export default articleSlice.reducer;