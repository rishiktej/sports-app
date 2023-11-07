import React, { useEffect, useState } from "react";
import { useMatchState } from "../../context/livescores/context";
import { API_ENDPOINT } from "../../config/constants";
import { match } from "../../context/livescores/types";
import {
  usePreferencesDispatch,
  usePreferencesState,
} from "../../context/preferences/context";
import { fetchPreferences } from "../../context/preferences/action";
import { RefreshIcon } from "@heroicons/react/solid";

export default function LiveAndPastMatches() {
  const p_dispatch = usePreferencesDispatch();
  useEffect(() => {
    fetchPreferences(p_dispatch);
  }, []);

  const state = useMatchState();
  const preferences_data = usePreferencesState();
  console.log(preferences_data);
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );
  const { matches, isLoading, isError, errorMessage } = state;
  console.log("matches", matches);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setAuthenticated(!!authToken);
  }, []);

  const [liveMatches, setLiveMatches] = useState<match[]>([]);
  const [pastMatches, setPastMatches] = useState<match[]>([]);
  const [pastMatchIds, setPastMatchIds] = useState<Set<number>>(new Set());
  console.log("pppm", pastMatches);

  const fetchMatchData = async (matchId: number, index: number) => {
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
      console.log("mmdata", data);
      console.log("dids", data.id);
      console.log("pppids", pastMatchIds);
      // Check if the match is live or in the past and add to the appropriate array
      const now = new Date().getTime();
      if (new Date(data.endsAt).getTime() > now) {
        setLiveMatches((prevMatches) => [...prevMatches, data]);
      }
      if (new Date(data.endsAt).getTime() <= now) {
        if (!pastMatchIds.has(data.id)) {
          setPastMatchIds((prevMatchIds) => {
            const newSet = new Set(prevMatchIds);
            newSet.add(data.id);
            return newSet;
          });
          setPastMatches((prevMatches) => [...prevMatches, data]);
        }
      }

      // Reset the refreshing state for the specific match card
      const updatedIsRefreshing = [...isRefreshing];
      updatedIsRefreshing[index] = false;
      setIsRefreshing(updatedIsRefreshing);
    } catch (error) {
      console.error("Operation failed:", error);

      // Handle errors and reset refreshing state on error
      const updatedIsRefreshing = [...isRefreshing];
      updatedIsRefreshing[index] = false;
      setIsRefreshing(updatedIsRefreshing);
    }
  };

  useEffect(() => {
    if (preferences_data && preferences_data.preferences.sports) {
      const sportsInPreferences = preferences_data.preferences.sports;

      // Filter live matches based on sports in preferences
      const liveMatches = matches.filter((match) =>
        sportsInPreferences.includes(match.sportName)
      );

      liveMatches.forEach((match, index) => {
        fetchMatchData(match.id, index);
      });
    }
  }, [matches, preferences_data]);

  const uniqueliveMatches = liveMatches.filter(
    (match, index, self) => index === self.findIndex((m) => m.id === match.id)
  );

  const uniquepastMatches = pastMatches.filter(
    (match, index, self) => index === self.findIndex((m) => m.id === match.id)
  );
  const [isRefreshing, setIsRefreshing] = useState(
    uniqueliveMatches.map(() => false)
  );
  const handleRefreshMatch = (matchId, index) => {
    if (!isRefreshing[index]) {
      // Create a copy of the isRefreshing array to modify the specific index
      const updatedIsRefreshing = [...isRefreshing];
      updatedIsRefreshing[index] = true;
      setIsRefreshing(updatedIsRefreshing);

      fetchMatchData(matchId, index);
    }
  };

  return (
    <div>
      {/* Render live and past matches for authenticated users */}
      {uniqueliveMatches.length > 0 && authenticated && (
        <div>
          <h2>Live Matches</h2>
          <div className="flex space-x-4 overflow-x-auto">
            {uniqueliveMatches.map((match, index) => (
              <div
                key={match.id}
                className="flex-shrink-0 w-64 p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg dark-bg-gray-800"
              >
                <p className="text-gray-600 text-sm dark:text-gray-400">
                  Sport: {match.sportName}
                </p>
                <h5 className="mb-2 text-sm font-medium tracking-tight text-gray-900">
                  {match.name}
                </h5>
                <div>
                  <h5 className="mb-2 text-sm font-medium tracking-tight text-gray-900">
                    SCORE:
                  </h5>
                  <ol className="list-decimal pl-4">
                    {match?.score &&
                      Object.entries(match?.score).map(([team, score]) => (
                        <li key={team} className="">
                          {team}: {score}
                        </li>
                      ))}
                  </ol>
                  <p className="text-sm text-gray-600">
                    Venue: {match.location}
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  Ends at: {new Date(match.endsAt).toLocaleString()}
                </p>
                <button
                  onClick={() => handleRefreshMatch(match.id, index)}
                  disabled={isRefreshing[index]}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                      clipRule="evenodd"
                    />
                  </svg>{" "}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {uniquepastMatches.length > 0 && authenticated && (
        <div>
          <h2>Past Matches</h2>
          <div className="flex space-x-4 overflow-x-auto">
            {uniquepastMatches.map((match) => (
              <div
                key={match.id}
                className="flex-shrink-0 w-64 p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg dark-bg-gray-800"
              >
                <p className="text-gray-600 text-sm dark:text-gray-400">
                  Sport: {match.sportName}
                </p>
                <h5 className="mb-2 text-sm font-medium tracking-tight text-gray-900">
                  {match.name}
                </h5>
                <div>
                  <h5 className="mb-2 text-sm font-medium tracking-tight text-gray-900">
                    SCORE:
                  </h5>
                  <ol className="list-decimal pl-4">
                    {match?.score &&
                      Object.entries(match?.score).map(([team, score]) => (
                        <li key={team} className="">
                          {team}: {score}
                        </li>
                      ))}
                  </ol>
                  <p className="text-sm text-gray-600">
                    Venue: {match.location}
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  Ends at: {new Date(match.endsAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
