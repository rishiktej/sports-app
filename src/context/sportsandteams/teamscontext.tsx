import React, { createContext, useContext, useReducer } from "react";
import { TeamsReducer, initialstate } from "./reducer";
import { TeamListState, TeamDispatch } from "./types";

// Create a context for Teams
const TeamsStateContext = createContext<TeamListState>(initialstate);
const TeamsDispatchContext = createContext<TeamDispatch>(() => {});
console.log(TeamsDispatchContext);
// Create a TeamsProvider component
export const TeamsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // Create a state and dispatch with `useReducer` passing in the `TeamsReducer` and an initial state.
  const [state, dispatch] = useReducer(TeamsReducer, initialstate);

  return (
    <TeamsStateContext.Provider value={state}>
      <TeamsDispatchContext.Provider value={dispatch}>
        {children}
      </TeamsDispatchContext.Provider>
    </TeamsStateContext.Provider>
  );
};

// Custom hooks to extract the `state` and `dispatch` out of the context
export const useTeamsState = () => useContext(TeamsStateContext);
export const useTeamsDispatch = () => useContext(TeamsDispatchContext);
