import { Reducer } from "react";
import {
  ArticleActions,
  ArticleListAvailableAction,
  Articlecontentstate,
} from "./types";


export const initialstate:Articlecontentstate={
  articlecontent:[],
  isLoading:false,
  isError: false,
  errorMessage: "",
}


export const ArticlecontentReducer: Reducer<Articlecontentstate, ArticleActions> = (
  state = initialstate,
  action
) => {
  switch (action.type) {
    case ArticleListAvailableAction.FETCH_ARTICLE_CONTENT_REQUEST:
      return {...state,isLoading:true};
    case ArticleListAvailableAction.FETCH_ARTICLE_CONTENT_SUCCESS:
      return { ...state, isLoading: false, articlecontent: action.payload };
    case ArticleListAvailableAction.FETCH_ARTICLE_CONTENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}