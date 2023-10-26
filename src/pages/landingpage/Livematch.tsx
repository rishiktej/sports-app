import React, { useEffect } from "react";
import MatchListItems from "./livescores";
import { fetchMatch } from "../../context/livescores/action";
import { useMatchDispatch } from "../../context/livescores/context";
import ArticleList from "./news";
import FilterLayout from "./filterlayout";

const MatchList: React.FC = () => {
  const matchdispatch = useMatchDispatch();
  console.log("md", matchdispatch);
  useEffect(() => {
    fetchMatch(matchdispatch);
  }, [matchdispatch]);
  return (
    <>
      <div>
        <MatchListItems />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-auto p-4">
          <h2 className="text-2xl font-medium tracking-tight text-slate-700 mb-4">
            Latest Articles
          </h2>
          <ArticleList />
        </div>
        <div className="md:w-auto p-4">
          <h2 className="text-2xl font-medium tracking-tight text-slate-700 mb-4">
            Filter by Sport and Team
          </h2>
          <FilterLayout />
        </div>
      </div>
    </>
  );
};

export default MatchList;
