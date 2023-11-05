import React, { useEffect, useState } from "react";
import { useMatchState } from "../../context/livescores/context";
import { API_ENDPOINT } from "../../config/constants";
import { match } from "../../context/livescores/types";
import {
  usePreferencesDispatch,
  usePreferencesState,
} from "../../context/preferences/context";
import { fetchPreferences } from "../../context/preferences/action";

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
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };

  useEffect(() => {
    if (preferences_data && preferences_data.preferences.sports) {
      const sportsInPreferences = preferences_data.preferences.sports;

      // Filter live matches based on sports in preferences
      const liveMatches = matches.filter((match) =>
        sportsInPreferences.includes(match.sportName)
      );

      liveMatches.forEach((match) => {
        fetchMatchData(match.id);
      });
    }
  }, [matches, preferences_data]);
  const uniqueliveMatches = liveMatches.filter(
    (match, index, self) => index === self.findIndex((m) => m.id === match.id)
  );
  const uniquepastMatches = pastMatches.filter(
    (match, index, self) => index === self.findIndex((m) => m.id === match.id)
  );
  return (
    <div>
      {/* Render live and past matches for authenticated users */}
      {uniqueliveMatches.length > 0 && authenticated && (
        <div>
          <h2>Live Matches</h2>
          <div className="flex space-x-4 overflow-x-auto">
            {uniqueliveMatches.map((match) => (
              <div
                key={match.id}
                className="flex-shrink-0 w-64 p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg dark-bg-gray-800"
              >
                <p className="text-gray-600 text-sm dark:text-gray-400">
                  Sport: {match.sportName}
                </p>
                <h5 className="mb-2 text-sm font-medium tracking-tight text-gray-900 ">
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
                <h5 className="mb-2 text-sm font-medium tracking-tight text-gray-900 ">
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
