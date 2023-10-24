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
import { Dialog, Transition } from "@headlessui/react";
import {
  useArticlecontentDispatch,
  useArticlecontentState,
} from "../../context/articles/context";
import { fetchArticle } from "../../context/articles/action";
import { article } from "../../context/articles/types";
import { Link } from "react-router-dom";

export default function ArticleDataListItems() {
  const state = useArticleState();
  const { articles, isLoading, isError, errorMessage } = state;
  const [selectedSport, setSelectedSport] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState<null | article[]>(
    null
  );
  const contentstate = useArticlecontentState();
  const articledispatch = useArticlecontentDispatch();
  const { articlecontent } = contentstate;
  const handleTabChange = (sport) => {
    setSelectedSport(sport);
  };

  // Filter articles based on selectedSport and showOnlyNews
  const filteredArticles = articles.filter((article) => {
    const matchesSport =
      selectedSport === "all" || article.sport.name === selectedSport;
    return matchesSport;
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
          {filteredArticles.map((article) => (
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
                  <Button>Read More</Button>
                </Link>
              </Card>
            </div>
          ))}
        </SimpleGrid>
      </div>
    </div>
  );
}
