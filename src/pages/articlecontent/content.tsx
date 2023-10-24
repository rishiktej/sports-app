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
  const { articleId } = useParams();

  useEffect(() => {
    if (articleId) {
      fetchArticle(articledispatch, parseInt(articleId))
        .then((data) => console.log("Fetched data:", data))
        .catch((error) => console.error("Fetch error:", error));
    }
  }, [articleId, articledispatch]);

  const selectedarticle =
    Array.isArray(articlestate?.articlecontent) &&
    articlestate?.articlecontent.find(
      (article) => `${article.id}` === articleId
    );

  console.log("articleId:", articleId);
  console.log("selectedarticle:", selectedarticle);

  return (
    <>
      <p>{selectedarticle ? selectedarticle.content : "Article not found"}</p>
    </>
  );
};

export default Articlecontent;
