import { IArticleModel, IArticleModelWithUser } from "@/models/article.model";

export interface ArticleState {
	articleAuthor?: IArticleModel[];
	article?: IArticleModel;
	articles?:IArticleModelWithUser[];
	error?: string;
}

