import React, { useEffect } from "react";
import MatchListItems from "./livescores";
import { fetchMatch } from "../../context/livescores/action";
import { useMatchDispatch } from "../../context/livescores/context";
import ArticleList from "./news";

const MatchList: React.FC = () => {
  const matchdispatch = useMatchDispatch();
  console.log("md", matchdispatch);
  useEffect(() => {
    fetchMatch(matchdispatch);
  }, [matchdispatch]);
  return (
    <>
      {" "}
      <div>
        <MatchListItems />
      </div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-slate-700">
          <ArticleList />
        </h2>
      </div>
    </>
  );
};

export default MatchList;
