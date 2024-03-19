import { useState } from "react";
import "./App.css";
import React from "react";
import { MatchProvider } from "./context/livescores/context";
import router from "./routes";
import { RouterProvider } from "react-router-dom";
import { ArticleProvider } from "./context/trendingnews/context";
import { SportsProvider } from "./context/sportsandteams/sportscontext";
import { TeamsProvider } from "./context/sportsandteams/teamscontext";
import { PreferencesProvider } from "./context/preferences/context";
import "./i18n.ts";

function App() {
  return (
    <>
      <MatchProvider>
        <SportsProvider>
          <TeamsProvider>
            <PreferencesProvider>
              <ArticleProvider>
                <RouterProvider router={router} />
              </ArticleProvider>
            </PreferencesProvider>
          </TeamsProvider>
        </SportsProvider>
      </MatchProvider>
    </>
  );
}
export default App;
