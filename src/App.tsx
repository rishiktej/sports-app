import { useState } from "react";
import "./App.css";
import React from "react";
import { MatchProvider } from "./context/livescores/context";
import router from "./routes";
import { RouterProvider } from "react-router-dom";
import { ArticleProvider } from "./context/trendingnews/context";
import { ArticlecontentProvider } from "./context/articles/context";

function App() {
  return (
    <>
      <MatchProvider>
        <ArticleProvider>
          <ArticlecontentProvider>
            <RouterProvider router={router} />
          </ArticlecontentProvider>
        </ArticleProvider>
      </MatchProvider>
    </>
  );
}
export default App;
