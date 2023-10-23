import React, { createContext, useContext, useReducer } from "react";
import { ArticlecontentReducer, initialstate } from "./reducer";
import { ArticlecontentDispatch, Articlecontentstate } from "./types";

const ArticlecontentStateContext =
  createContext<Articlecontentstate>(initialstate);
const ArticlecontentDispatchContext = createContext<ArticlecontentDispatch>(
  () => {}
);

console.log("ds...", ArticlecontentDispatchContext);

export const ArticlecontentProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // Create a state and dispatch with `useReducer` passing in the `ArticleReducer` and an initial state.
  const [state, dispatch] = useReducer(ArticlecontentReducer, initialstate);
  console.log("ac..", ArticlecontentReducer);
  return (
    <ArticlecontentStateContext.Provider value={state}>
      <ArticlecontentDispatchContext.Provider value={dispatch}>
        {children}
      </ArticlecontentDispatchContext.Provider>
    </ArticlecontentStateContext.Provider>
  );
};

export const useArticlecontentState = () =>
  useContext(ArticlecontentStateContext);
export const useArticlecontentDispatch = () =>
  useContext(ArticlecontentDispatchContext);
