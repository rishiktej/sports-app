import React, { createContext, useContext, useReducer } from "react";
import {
  ArticleReducer,
  ArticlecontentReducer,
  initialState,
  initialstate,
} from "./reducer";
import {
  ArticleListState,
  ArticleDispatch,
  Articlecontentstate,
} from "./types";

// Create a context for Article
const ArticleStateContext = createContext<ArticleListState>(initialState);
const ArticleDispatchContext = createContext<ArticleDispatch>(() => {});
const ArticlecontentStateContext =
  createContext<Articlecontentstate>(initialstate);
const ArticlecontentDispatchContext = createContext<ArticleDispatch>(() => {});

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

// Custom hooks to extract the `state` and `dispatch` out of the context
export const useArticleState = () => useContext(ArticleStateContext);
export const useArticleDispatch = () => useContext(ArticleDispatchContext);
export const useArticlecontentState = () =>
  useContext(ArticlecontentStateContext);
export const useArticlecontentDispatch = () =>
  useContext(ArticlecontentDispatchContext);
