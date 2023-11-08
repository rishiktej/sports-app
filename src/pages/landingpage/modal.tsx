import React, { Fragment, useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";
import { article } from "../../context/trendingnews/types";
import { Link } from "react-router-dom";

export default function ArticleDialog() {
  const [selectedArticle, setSelectedArticle] = useState<null | article>(null);
  const { articleId } = useParams();

  useEffect(() => {
    // Fetch the article data when the component mounts
    if (articleId) {
      fetchArticleData(parseInt(articleId));
    }
  }, [articleId]);

  const fetchArticleData = async (articleId: number) => {
    const token = localStorage.getItem("authToken") || "";
    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${articleId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Article");
      }

      const data = await response.json();
      setSelectedArticle(data);
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };
  const closeArticleDialog = () => {
    setSelectedArticle(null);
  };

  return (
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
                <div>
                  <img
                    src={selectedArticle?.thumbnail}
                    alt="Article Thumbnail"
                    style={{ width: "500px", height: "350px" }}
                  />
                </div>
                <div>
                  <h1 className="text-xl uppercase bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                    TITLE:{selectedArticle?.title}
                  </h1>
                </div>
                <div className="text-lg">
                  SPORT:{selectedArticle?.sport.name}
                </div>
                <div>DATE:{new Date(selectedArticle?.date).toDateString()}</div>
                <div className="mt-2">
                  <p>{selectedArticle?.content}</p>
                </div>
                <div className="mt-2">
                  <p>Teams:</p>
                  <ul>
                    {selectedArticle?.teams.map((team) => (
                      <li key={team.id}>{team.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <Link to={`${"../"}`}>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <Button onClick={closeArticleDialog}>Close</Button>
                </div>
              </Link>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
