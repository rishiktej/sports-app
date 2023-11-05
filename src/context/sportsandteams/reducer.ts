import { Reducer } from "react";
import {
  SportsActions,
  TeamActions,
  SportsListAvailableAction,
  TeamListAvailableAction,
  SportsListState,
  TeamListState
} from "./types";

export const initialState: SportsListState = {
  sports: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};
export const initialstate: TeamListState = {
  teams: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const SportsReducer: Reducer<SportsListState, SportsActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SportsListAvailableAction.FETCH_Sports_REQUEST:
      return { ...state, isLoading: true };
    case SportsListAvailableAction.FETCH_Sports_SUCCESS:
      return { ...state, isLoading: false, sports: action.payload };
    case SportsListAvailableAction.FETCH_Sports_FAILURE:
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

export const TeamsReducer: Reducer<TeamListState, TeamActions> = (
  state = initialstate,
  action
) => {
  switch (action.type) {
    case TeamListAvailableAction.FETCH_Team_REQUEST:
      return { ...state, isLoading: true };
    case TeamListAvailableAction.FETCH_Team_SUCCESS:
      return { ...state, isLoading: false, teams: action.payload };
    case TeamListAvailableAction.FETCH_Team_FAILURE:
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