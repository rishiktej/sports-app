import React, { Fragment, useEffect, useState } from "react";
import { useArticleState } from "../../context/trendingnews/context";
import {
  Card,
  CardBody,
  Heading,
  Image,
  SimpleGrid,
  Text,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  usePreferencesDispatch,
  usePreferencesState,
} from "../../context/preferences/context";
import { fetchPreferences } from "../../context/preferences/action";

export default function userArticleDataListItems() {
  const p_dispatch = usePreferencesDispatch();
  useEffect(() => {
    fetchPreferences(p_dispatch);
  }, []);

  const preferences_data = usePreferencesState();
  console.log(preferences_data);
  const sportNames = preferences_data.preferences.sports || [];
  const state = useArticleState();
  const { articles, isLoading, isError, errorMessage } = state;
  const [selectedSport, setSelectedSport] = useState("all");
  const handleTabChange = (sport) => {
    setSelectedSport(sport);
  };
  const filteredArticles = articles.filter((article) => {
    const matchesSport =
      selectedSport === "all" || article.sport.name === selectedSport;
    const matchesSportName = sportNames.includes(article.sport.name);
    return matchesSport && matchesSportName;
  });

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
            onClick={() => handleTabChange("all")}
            className={`text-gray-700 px-4 py-2 rounded ${
              selectedSport === "all" && "font-bold bg-blue-200"
            }`}
          >
            All
          </button>
        </li>
        {sportNames.map((sportName) => (
          <li key={sportName} className="cursor-pointer">
            <button
              onClick={() => handleTabChange(sportName)}
              className={`text-gray-700 px-4 py-2 rounded ${
                selectedSport === sportName && "font-bold bg-blue-200"
              }`}
            >
              {sportName}
            </button>
          </li>
        ))}
      </ul>
      <div className="space-y-4">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {filteredArticles.length == 0 ? (
            <span>No articles found for the selected sport.</span>
          ) : (
            filteredArticles.map((article) => (
              <div key={article.id} className="bg-white p-1 rounded shadow-sm">
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
                  <CardBody>
                    <Heading size="md">{article.title}</Heading>
                    <Text fontSize="sm" color="gray.500">
                      Date: {new Date(article.date).toDateString()}
                    </Text>
                    <Text fontSize="sm">Summary: {article.summary}</Text>
                  </CardBody>
                  <Link to={`${article.id}`}>
                    <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                      Read More
                    </Button>
                  </Link>
                </Card>
              </div>
            ))
          )}
        </SimpleGrid>
      </div>
    </div>
  );
}
