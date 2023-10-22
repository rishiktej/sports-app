import React, { createContext, useContext, useReducer } from "react";
import { MatchReducer, initialState } from "./reducer";
import { MatchListState, MatchDispatch } from "./types";

// Create a context for Match
const MatchStateContext = createContext<MatchListState>(initialState);
const MatchDispatchContext = createContext<MatchDispatch>(() => {});
console.log(MatchDispatchContext);
// Create a MatchProvider component
export const MatchProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // Create a state and dispatch with `useReducer` passing in the `MatchReducer` and an initial state.
  const [state, dispatch] = useReducer(MatchReducer, initialState);

  return (
    <MatchStateContext.Provider value={state}>
      <MatchDispatchContext.Provider value={dispatch}>
        {children}
      </MatchDispatchContext.Provider>
    </MatchStateContext.Provider>
  );
};

// Custom hooks to extract the `state` and `dispatch` out of the context
export const useMatchState = () => useContext(MatchStateContext);
export const useMatchDispatch = () => useContext(MatchDispatchContext);
