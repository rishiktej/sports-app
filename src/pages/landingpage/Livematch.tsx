import React, { useEffect, useState } from "react";
import MatchListItems from "./livescores";
import UserMatchlist from "./userlivescores";
import { fetchMatch } from "../../context/livescores/action";
import {
  useMatchDispatch,
  useMatchState,
} from "../../context/livescores/context";
import ArticleList from "./news";
import FilterLayout from "./filterlayout";
import { match } from "../../context/livescores/types";
import { API_ENDPOINT } from "../../config/constants";

const MatchList: React.FC = () => {
  const matchdispatch = useMatchDispatch();
  console.log("md", matchdispatch);
  useEffect(() => {
    fetchMatch(matchdispatch);
  }, [matchdispatch]);
  const state = useMatchState();
  const { matches, isLoading, isError, errorMessage } = state;
  const [selectedMatches, setselectedMatches] = useState<match[]>([]);
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setAuthenticated(!!authToken);
  }, []);
  console.log("smm", selectedMatches);
  const fetchMatchData = async (matchId: number) => {
    const token = localStorage.getItem("authToken") || "";
    try {
      const response = await fetch(`${API_ENDPOINT}/matches/${matchId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw Error("Failed to fetch Match Data");
      }

      const data = await response.json();
      setselectedMatches((prevSelectedMatches) => [
        ...prevSelectedMatches,
        data,
      ]);
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };
  useEffect(() => {
    const latestMatches = matches
      .sort(
        (a, b) => new Date(b.endsAt).getTime() - new Date(a.endsAt).getTime()
      )
      .slice(0, 5);
    latestMatches.forEach((match) => {
      fetchMatchData(match.id);
    });
  }, [matches]);
  console.log(selectedMatches);
  return (
    <>
      <div>
        {authenticated ? (
          <UserMatchlist />
        ) : (
          <MatchListItems selectedMatches={selectedMatches} />
        )}
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
