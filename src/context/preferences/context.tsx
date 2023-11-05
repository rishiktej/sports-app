import React, { createContext, useContext, useReducer } from "react";
import { PreferencesReducer, initialState } from "./reducer";
import { PreferencesListState, PreferencesDispatch } from "./types";

// Create a context for Preferences
const PreferencesStateContext =
  createContext<PreferencesListState>(initialState);
const PreferencesDispatchContext = createContext<PreferencesDispatch>(() => {});
console.log(PreferencesDispatchContext);
// Create a PreferencesProvider component
export const PreferencesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // Create a state and dispatch with `useReducer` passing in the `PreferencesReducer` and an initial state.
  const [state, dispatch] = useReducer(PreferencesReducer, initialState);

  return (
    <PreferencesStateContext.Provider value={state}>
      <PreferencesDispatchContext.Provider value={dispatch}>
        {children}
      </PreferencesDispatchContext.Provider>
    </PreferencesStateContext.Provider>
  );
};

// Custom hooks to extract the `state` and `dispatch` out of the context
export const usePreferencesState = () => useContext(PreferencesStateContext);
export const usePreferencesDispatch = () =>
  useContext(PreferencesDispatchContext);
