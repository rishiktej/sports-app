import React, { useEffect, useState } from "react";
import { useMatchState } from "../../context/livescores/context";
import { API_ENDPOINT } from "../../config/constants";
import { match } from "../../context/livescores/types";

export default function MatchDataListItems() {
  const state = useMatchState();
  const { matches, isLoading, isError, errorMessage } = state;
  const [selectedMatches, setSelectedMatches] = useState<match[]>([]);

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
        throw new Error("Failed to fetch Match Data");
      }

      const data = await response.json();
      setSelectedMatches((prevMatches) =>
        prevMatches.map((prevMatch) =>
          prevMatch.id === data.id ? data : prevMatch
        )
      );
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };

  useEffect(() => {
    // Fetch match data for each of the latest matches
    const latestMatchIds = matches
      .sort(
        (a, b) => new Date(b.endsAt).getTime() - new Date(a.endsAt).getTime()
      )
      .slice(0, 5)
      .map((match) => match.id);

    // Fetch data for each of the latest matches
    latestMatchIds.forEach((matchId) => {
      fetchMatchData(matchId);
    });
  }, []);

  const handleRefreshClick = (matchId: number) => {
    // Manually refresh the scores for a specific match
    fetchMatchData(matchId);
  };

  return (
    <div className="flex space-x-4 overflow-x-auto">
      {selectedMatches.map((match) => (
        <div
          key={match.id}
          className="flex-shrink-0 w-64 p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg dark:bg-gray-800"
        >
          <p className="text-gray-600 text-sm dark:text-gray-400">
            Sport: {match.sportName}
          </p>
          <h5 className="mb-2 text-sm font-medium tracking-tight text-gray-900 dark:text-white">
            {match.name}
          </h5>
          <div className="mb-4">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white">
              SCORE:
            </h5>
            <ul className="list-decimal pl-4">
              <ol className="list-decimal pl-4">
                {Object.entries(match.score).map(([team, score]) => (
                  <li
                    key={team}
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    {team}: {score}
                  </li>
                ))}
              </ol>
            </ul>
          </div>
          <div className="flex items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Venue: {match.location}
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ends at: {new Date(match.endsAt).toLocaleString()}
          </p>
          <button
            onClick={() => handleRefreshClick(match.id)}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Refresh Score
          </button>
        </div>
      ))}
    </div>
  );
}
