import React, { Suspense } from "react";
import MatchList from "./Livematch";

const Matches = () => {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-medium tracking-tight text-slate-700">
          <MatchList />
        </h2>
      </div>
    </>
  );
};

export default Matches;
