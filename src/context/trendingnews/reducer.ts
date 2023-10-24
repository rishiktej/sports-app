import { Reducer } from "react";
import {
  ArticleActions,
  ArticleListAvailableAction,
  ArticleListState,
} from "./types";

export const initialState: ArticleListState = {
  articles: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};


export const ArticleReducer: Reducer<ArticleListState, ArticleActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ArticleListAvailableAction.FETCH_ARTICLE_REQUEST:
      return { ...state, isLoading: true };
    case ArticleListAvailableAction.FETCH_ARTICLE_SUCCESS:
      return { ...state, isLoading: false, articles: action.payload };
    case ArticleListAvailableAction.FETCH_ARTICLE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};