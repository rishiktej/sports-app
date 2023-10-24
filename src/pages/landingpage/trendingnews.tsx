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

  const articlesForSelectedSport = articles.filter(
    (article) => article.sport.name === selectedSport
  );
  if (isLoading) {
    return <span className="text-center">Loading...</span>;
  }

  if (isError) {
    return <span className="text-center">{errorMessage}</span>;
  }
  const openArticlecontent = (article) => {
    fetchArticle(articledispatch, parseInt(article));
    setSelectedArticle(articlecontent);
  };
  console.log(articlecontent);

  const closeArticleDialog = () => {
    setSelectedArticle(null);
  };

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
                <Button onClick={() => openArticlecontent(article.id)}>
                  Read More
                </Button>
              </Card>
            </div>
          ))}
        </SimpleGrid>
      </div>
      <Transition.Root show={selectedArticle !== null} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeArticleDialog}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Article Content
                  </Dialog.Title>
                  <div className="mt-2">
                    <p>{selectedArticle?.content}</p>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <Button onClick={closeArticleDialog}>Close</Button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
