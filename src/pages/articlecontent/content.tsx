import React, { useEffect } from "react";
import { fetchArticle } from "../../context/articles/action";
import {
  useArticlecontentDispatch,
  useArticlecontentState,
} from "../../context/articles/context";
import { useParams } from "react-router-dom";

const Articlecontent = () => {
  const articledispatch = useArticlecontentDispatch();
  const articlestate = useArticlecontentState();
  console.log("md", articledispatch);
  const { articleId } = useParams();
  useEffect(() => {
    if (articleId) fetchArticle(articledispatch, parseInt(articleId));
  }, [articleId, articledispatch]);
  const selectedarticle = articlestate?.articlecontent.filter(
    (article) => `${article.id}` === articleId
  )?.[0];

  return (
    <>
      <p>{selectedarticle.content}</p>
    </>
  );
};

export default Articlecontent;
