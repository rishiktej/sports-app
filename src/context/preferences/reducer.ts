import { Reducer } from "react";
import {
  preferencesActions,
  PreferencesListAvailableAction,
  PreferencesListState
} from "./types";

export const initialState: PreferencesListState = {
  preferences: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const PreferencesReducer: Reducer<PreferencesListState, preferencesActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case PreferencesListAvailableAction.FETCH_Preferences_REQUEST:
      return { ...state, isLoading: true };
    case PreferencesListAvailableAction.FETCH_Preferences_SUCCESS:
      return { ...state, isLoading: false, preferences: action.payload };
    case PreferencesListAvailableAction.FETCH_Preferences_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
