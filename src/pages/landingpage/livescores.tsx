import React, { useEffect, useState } from "react";
import { useMatchState } from "../../context/livescores/context";
import { match } from "../../context/livescores/types";
import { API_ENDPOINT } from "../../config/constants";

interface LatestMatchesProps {
  selectedMatches: match[];
}

export default function LatestMatches({ selectedMatches }: LatestMatchesProps) {
  const uniqueMatches = selectedMatches.filter(
    (match, index, self) => index === self.findIndex((m) => m.id === match.id)
  );
  const state = useMatchState();
  const { matches, isLoading, isError, errorMessage } = state;
  console.log("matches", matches);
  console.log(selectedMatches);

  return (
    <div>
      {/* Render latest matches for non-authenticated users */}
      {uniqueMatches.length > 0 && (
        <div>
          <h2>Latest Matches</h2>
          <div className="flex space-x-4 overflow-x-auto">
            {uniqueMatches.map((match) => (
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
