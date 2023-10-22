import React, { useEffect } from "react";
import MatchListItems from "./livescores";
import { fetchMatch } from "../../context/livescores/action";
import { useMatchDispatch } from "../../context/livescores/context";

const MatchList: React.FC = () => {
  const matchdispatch = useMatchDispatch();
  console.log(matchdispatch);
  useEffect(() => {
    fetchMatch(matchdispatch);
  }, [matchdispatch]);
  return (
    <div className="grid gap-4 grid-cols-4 mt-5">
      <MatchListItems />
    </div>
  );
};

export default MatchList;
