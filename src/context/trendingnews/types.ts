export type Team = {
  id: number;
  name: string;
};

export type Sport = {
  id: number;
  name: string;
};

export type article = {
  id: number;
  title: string;
  thumbnail: string;
  content:string;
  sport: Sport;
  date: string;
  summary: string;
  teams: Team[];
};
export type articleData = Omit<article,"content">;
export type articleContent=article
export type ArticleListState = {
  articles: articleData[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};
export enum ArticleListAvailableAction {
  // ... (existing actions)
  FETCH_ARTICLE_REQUEST = "FETCH_ARTICLE_REQUEST",
  FETCH_ARTICLE_SUCCESS = "FETCH_ARTICLE_SUCCESS",
  FETCH_ARTICLE_FAILURE = "FETCH_ARTICLE_FAILURE",
}

// Add a new action type for MATCH
export type ArticleActions =
  | { type: ArticleListAvailableAction.FETCH_ARTICLE_REQUEST }
  | {
      type: ArticleListAvailableAction.FETCH_ARTICLE_SUCCESS;
      payload: articleData[];
    }
  | {
      type: ArticleListAvailableAction.FETCH_ARTICLE_FAILURE;
      payload: string;
    }
export type ArticleDispatch = React.Dispatch<ArticleActions>;

