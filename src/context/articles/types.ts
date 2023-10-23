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

export type articleContent=article
export type Articlecontentstate={
  articlecontent:articleContent[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}
export enum ArticleListAvailableAction {
  FETCH_ARTICLE_CONTENT_REQUEST="FETCH_ARTICLE_CONTENT_REQUEST",
  FETCH_ARTICLE_CONTENT_SUCCESS="FETCH_ARTICLE_CONTENT_SUCCESS",
  FETCH_ARTICLE_CONTENT_FAILURE="FETCH_ARTICLE_CONTENT_FAILURE",
}

// Add a new action type for MATCH
export type ArticleActions =
  | { type: ArticleListAvailableAction.FETCH_ARTICLE_CONTENT_REQUEST }
  | {
      type: ArticleListAvailableAction.FETCH_ARTICLE_CONTENT_SUCCESS;
      payload: articleContent[];
    }
  | {
      type: ArticleListAvailableAction.FETCH_ARTICLE_CONTENT_FAILURE;
      payload: string;
    };

export type ArticlecontentDispatch = React.Dispatch<ArticleActions>;

