import React from "react";
import { useMatchState } from "../../context/livescores/context";

export default function MatchDataListItems() {
  const state = useMatchState();
  const { matches, isLoading, isError, errorMessage } = state;

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  // Sort matches by their 'endsAt' timestamp in descending order (latest first)
  const sortedMatches = [...matches].sort(
    (a, b) => new Date(b.endsAt).getTime() - new Date(a.endsAt).getTime()
  );

  // Take the latest five matches
  const latestMatches = sortedMatches.slice(0, 5);

  return (
    <div className="flex space-x-4 overflow-x-auto">
      {latestMatches.map((match) => (
        <div
          key={match.id}
          className="flex-shrink-0 w-64 p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg dark:bg-gray-800"
        >
          <p className="text-gray-600 text-sm dark:text-gray-400">
            sport:{match.sportName}
          </p>
          <h5 className="mb-2 text-sm font-medium tracking-tight text-gray-900 dark:text-white">
            {match.name}
          </h5>
          <p className="text-gray-600 text-sm dark:text-gray-400">
            venue:{match.location}
          </p>
          <p className="text-gray-600 text-sm dark:text-gray-400"></p>
          <p className="text-gray-600 text-sm dark:text-gray-400">
            Ends at: {new Date(match.endsAt).toLocaleString()}
          </p>
          {/* Add more properties you want to display */}
        </div>
      ))}
    </div>
  );
}
