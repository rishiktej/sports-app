import React, { createContext, useContext, useReducer } from "react";
import { SportsReducer, initialState } from "./reducer";
import { SportsListState, SportsDispatch } from "./types";

// Create a context for Sports
const SportsStateContext = createContext<SportsListState>(initialState);
const SportsDispatchContext = createContext<SportsDispatch>(() => {});
console.log(SportsDispatchContext);
// Create a SportsProvider component
export const SportsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // Create a state and dispatch with `useReducer` passing in the `SportsReducer` and an initial state.
  const [state, dispatch] = useReducer(SportsReducer, initialState);

  return (
    <SportsStateContext.Provider value={state}>
      <SportsDispatchContext.Provider value={dispatch}>
        {children}
      </SportsDispatchContext.Provider>
    </SportsStateContext.Provider>
  );
};

// Custom hooks to extract the `state` and `dispatch` out of the context
export const useSportsState = () => useContext(SportsStateContext);
export const useSportsDispatch = () => useContext(SportsDispatchContext);
