import { useState } from "react";
import "./App.css";
import React from "react";
import { MatchProvider } from "./context/livescores/context";
import router from "./routes";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      <MatchProvider>
        <RouterProvider router={router} />
      </MatchProvider>
    </>
  );
}
export default App;
