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
      setSelectedMatches((prevMatches) => [...prevMatches, data]);
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };
  useEffect(() => {
    const latestMatchIds = matches
      .sort(
        (a, b) => new Date(b.endsAt).getTime() - new Date(a.endsAt).getTime()
      )
      .slice(0, 5)
      .map((match) => match.id);

    latestMatchIds.forEach((matchId) => {
      if (
        !selectedMatches.some((existingMatch) => existingMatch.id === matchId)
      ) {
        fetchMatchData(matchId);
      }
    });
  }, [matches]);

  console.log(selectedMatches);
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
          <div>
            <h5 className="mb-2 text-sm font-medium tracking-tight text-gray-900 dark:text-white">
              SCORE:
            </h5>
            <ol className="list-decimal pl-4">
              {match?.score &&
                Object.entries(match?.score).map(([team, score]) => (
                  <li
                    key={team}
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    {team}: {score}
                  </li>
                ))}
            </ol>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Venue: {match.location}
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ends at: {new Date(match.endsAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
