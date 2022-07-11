export interface IArticleModel {
  id: string
  title: string
  text: string
  createdAt: string
  updatedAt: string
  UserId: string
}


export interface IArticleModelWithUser {
  id: string
  title: string
  text: string
  createdAt: string
  updatedAt: string
  User: IArticleAuthor
}

export interface IArticleAuthor {
  id: string
  name: string
  surname: string
}
