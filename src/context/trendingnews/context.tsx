import React, { createContext, useContext, useReducer } from "react";
import { ArticleReducer, initialState } from "./reducer";
import { ArticleListState, ArticleDispatch } from "./types";

// Create a context for Article
const ArticleStateContext = createContext<ArticleListState>(initialState);
const ArticleDispatchContext = createContext<ArticleDispatch>(() => {});

console.log("jj", ArticleDispatchContext);

// Create a ArticleProvider component
export const ArticleProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // Create a state and dispatch with `useReducer` passing in the `ArticleReducer` and an initial state.
  const [state, dispatch] = useReducer(ArticleReducer, initialState);
  console.log("ar..", ArticleReducer);
  return (
    <ArticleStateContext.Provider value={state}>
      <ArticleDispatchContext.Provider value={dispatch}>
        {children}
      </ArticleDispatchContext.Provider>
    </ArticleStateContext.Provider>
  );
};

// Custom hooks to extract the `state` and `dispatch` out of the context
export const useArticleState = () => useContext(ArticleStateContext);
export const useArticleDispatch = () => useContext(ArticleDispatchContext);
