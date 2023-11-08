import React from "react";
import { match } from "../../context/livescores/types";

interface LatestMatchesProps {
  selectedMatches: match[];
  onRefreshMatch: (matchId: string) => void;
}

export default function LatestMatches({
  selectedMatches,
  onRefreshMatch,
}: LatestMatchesProps) {
  const uniqueMatches = selectedMatches.filter(
    (match, index, self) => index === self.findIndex((m) => m.id === match.id)
  );

  const isMatchLive = (match) => {
    return new Date(match.endsAt).getTime() > Date.now();
  };

  const liveMatches = uniqueMatches.filter(isMatchLive);
  const upcomingMatches = uniqueMatches.filter((match) => !isMatchLive(match));

  return (
    <div>
      {/* Render latest matches for non-authenticated users */}
      {uniqueMatches.length > 0 && (
        <div>
          <h2>Latest Matches</h2>
          <div className="overflow-x-auto">
            {liveMatches.length > 0 && (
              <div>
                <h3>Live Matches</h3>
                <div className="flex space-x-4">
                  {liveMatches.map((match) => (
                    <div
                      key={match.id}
                      className="w-64 p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg dark-bg-gray-800"
                    >
                      {" "}
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
                            Object.entries(match?.score).map(
                              ([team, score]) => (
                                <li key={team} className="">
                                  {team}: {score}
                                </li>
                              )
                            )}
                        </ol>
                        <p className="text-sm text-gray-600">
                          Venue: {match.location}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600">
                        Ends at: {new Date(match.endsAt).toLocaleString()}
                      </p>
                      <button onClick={() => onRefreshMatch(String(match.id))}>
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
            {upcomingMatches.length > 0 && (
              <div>
                <h3>Other Matches</h3>
                <div className="flex space-x-4">
                  {upcomingMatches.map((match) => (
                    <div
                      key={match.id}
                      className="w-64 p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg dark-bg-gray-800"
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
                            Object.entries(match?.score).map(
                              ([team, score]) => (
                                <li key={team} className="">
                                  {team}: {score}
                                </li>
                              )
                            )}
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
        </div>
      )}
    </div>
  );
}
