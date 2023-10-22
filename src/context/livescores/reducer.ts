import { Reducer } from "react";
import {
  MatchActions,
  MatchListAvailableAction,
  MatchListState,
} from "./types";

export const initialState: MatchListState = {
  matches: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const MatchReducer: Reducer<MatchListState, MatchActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case MatchListAvailableAction.FETCH_MATCH_REQUEST:
      return { ...state, isLoading: true };
    case MatchListAvailableAction.FETCH_MATCH_SUCCESS:
      return { ...state, isLoading: false, matches: action.payload };
    case MatchListAvailableAction.FETCH_MATCH_FAILURE:
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
