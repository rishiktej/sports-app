import React, { useState } from "react";
import { useArticleState } from "../../context/trendingnews/context";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";

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
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {articlesForSelectedSport.map((article) => (
            <Link
              key={article.id}
              to={`${article.id}`}
              className="bg-white p-1 rounded shadow-sm cursor-pointer"
            >
              <Card
                w="750px"
                className="bg-white border-black border-4 border-grey-500"
              >
                <Image
                  objectFit="cover"
                  maxH="200px"
                  src={article.thumbnail}
                  alt="Article Thumbnail"
                />
                <span>
                  <CardBody>
                    <Heading size="md">{article.title}</Heading>
                    <Text fontSize="sm" color="gray.500">
                      Date: {new Date(article.date).toDateString()}
                    </Text>
                    <Text fontSize="sm">Summary:{article.summary}</Text>
                  </CardBody>
                </span>
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      </div>
    </div>
  );
}
