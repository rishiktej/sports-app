import React, { useState } from "react";
import { useArticleState } from "../../context/trendingnews/context";
import { Link } from "react-router-dom";
export default function ArticleDataListItems() {
  const state = useArticleState();
  const { articles, isLoading, isError, errorMessage } = state;
  const [selectedSport, setSelectedSport] = useState("all");

  const handleTabChange = (sport) => {
    setSelectedSport(sport);
  };

  const articlesForSelectedSport = articles.filter(
    (article) => article.sport.name === selectedSport
  );

  if (isLoading) {
    return <span className="text-center">Loading...</span>;
  }

  if (isError) {
    return <span className="text-center">{errorMessage}</span>;
  }

  return (
    <div className="space-y-4">
      <ul className="flex flex-row justify-between">
        <li className="cursor-pointer">
          <button
            onClick={() => handleTabChange("Field Hockey")}
            className={`text-gray-700 px-4 py-2 rounded ${
              selectedSport === "Field Hockey" && "font-bold bg-blue-200"
            }`}
          >
            Field Hockey
          </button>
        </li>
        <li className="cursor-pointer">
          <button
            onClick={() => handleTabChange("Cricket")}
            className={`text-gray-700 px-4 py-2 rounded ${
              selectedSport === "Cricket" && "font-bold bg-blue-200"
            }`}
          >
            Cricket
          </button>
        </li>
        <li className="cursor-pointer">
          <button
            onClick={() => handleTabChange("American Football")}
            className={`text-gray-700 px-4 py-2 rounded ${
              selectedSport === "American Football" && "font-bold bg-blue-200"
            }`}
          >
            Football
          </button>
        </li>
        <li className="cursor-pointer">
          <button
            onClick={() => handleTabChange("Basketball")}
            className={`text-gray-700 px-4 py-2 rounded ${
              selectedSport === "Basketball" && "font-bold bg-blue-200"
            }`}
          >
            Basketball
          </button>
        </li>
        <li className="cursor-pointer">
          <button
            onClick={() => handleTabChange("Table Tennis")}
            className={`text-gray-700 px-4 py-2 rounded ${
              selectedSport === "Table Tennis" && "font-bold bg-blue-200"
            }`}
          >
            Table Tennis
          </button>
        </li>
      </ul>
      <div className="space-y-4">
        {articlesForSelectedSport.map((article) => (
          <Link
            key={article.id}
            to={`${article.id}`}
            className="bg-white p-2 rounded shadow-sm cursor-pointer"
          >
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-full h-16 object-cover rounded-t"
            />
            <div className="p-2">
              <h2 className="text-sm font-semibold">{article.title}</h2>
              <p className="text-gray-500 text-xs">
                {new Date(article.date).toDateString()}
              </p>
              <p className="mt-1 text-xs">{article.summary}</p>
              <p className="text-blue-500 hover:underline cursor-pointer text-xs">
                Read More
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
