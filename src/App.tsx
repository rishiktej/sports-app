import { useState } from "react";
import "./App.css";
import React from "react";
import { MatchProvider } from "./context/livescores/context";
import router from "./routes";
import { RouterProvider } from "react-router-dom";
import { ArticleProvider } from "./context/trendingnews/context";

function App() {
  return (
    <>
      <MatchProvider>
        <ArticleProvider>
          <RouterProvider router={router} />
        </ArticleProvider>
      </MatchProvider>
    </>
  );
}
export default App;
