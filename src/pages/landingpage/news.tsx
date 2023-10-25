import React, { useEffect } from "react";
import ArticleListItems from "./trendingnews";
import { useArticleDispatch } from "../../context/trendingnews/context";
import { fetchArticles } from "../../context/trendingnews/action";
import { Outlet } from "react-router-dom";
const ArticleList: React.FC = () => {
  const ArticleDispatch = useArticleDispatch();
  console.log("ad..", ArticleDispatch);
  useEffect(() => {
    fetchArticles(ArticleDispatch);
  }, [ArticleDispatch]);
  return (
    <div>
      <ArticleListItems />
      <Outlet />
    </div>
  );
};

export default ArticleList;
