import { API_ENDPOINT } from "../../config/constants";
import {
  ArticleListAvailableAction,
  ArticleDispatch,
} from "./types";

export const fetchArticles = async (
  dispatch: ArticleDispatch,
) => {
  console.log("hello")
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: ArticleListAvailableAction.FETCH_ARTICLE_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/articles`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Article");
    }

    const data = await response.json();
    console.log("data",data)
    dispatch({
      type: ArticleListAvailableAction.FETCH_ARTICLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({
      type: ArticleListAvailableAction.FETCH_ARTICLE_FAILURE,
      payload: "Unable to load Article",
    });
  }
};
export const fetchArticle = async (
  dispatch: ArticleDispatch,
  articleId:number
) => {
  console.log("hello")
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: ArticleListAvailableAction.FETCH_ARTICLE_CONTENT_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/articles/${articleId}`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Article");
    }

    const data = await response.json();
    console.log("da",data)
    dispatch({
      type: ArticleListAvailableAction.FETCH_ARTICLE_CONTENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({
      type: ArticleListAvailableAction.FETCH_ARTICLE_CONTENT_FAILURE,
      payload: "Unable to load Article",
    });
  }
};