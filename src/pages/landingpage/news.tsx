import React, { useEffect, useState } from "react";
import ArticleListItems from "./trendingnews";
import UserArticlelistItems from "./usertrendingnews";
import { useArticleDispatch } from "../../context/trendingnews/context";
import { fetchArticles } from "../../context/trendingnews/action";
import { Outlet } from "react-router-dom";

const ArticleList: React.FC = () => {
  const ArticleDispatch = useArticleDispatch();
  console.log("ad..", ArticleDispatch);
  useEffect(() => {
    fetchArticles(ArticleDispatch);
  }, [ArticleDispatch]);
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setAuthenticated(!!authToken);
  }, []);
  return (
    <div>
      {authenticated ? (
        <>
          <UserArticlelistItems />
          <Outlet />
        </>
      ) : (
        <>
          <ArticleListItems />
          <Outlet />
        </>
      )}
    </div>
  );
};

export default ArticleList;
