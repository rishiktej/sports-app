export type team = {
  id: number;
  name: string;
};
export type match = {
  id: number;
  name: string;
  location: string;
  sportName: string;
  endsAt: string;
  isrunning: boolean;
  teams: team;
};
export type MatchData = match;
export type MatchListState = {
  matches: MatchData[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};
export enum MatchListAvailableAction {
  // ... (existing actions)
  FETCH_MATCH_REQUEST = "FETCH_MATCH_REQUEST",
  FETCH_MATCH_SUCCESS = "FETCH_MATCH_SUCCESS",
  FETCH_MATCH_FAILURE = "FETCH_MATCH_FAILURE",
}

// Add a new action type for MATCH
export type MatchActions =
  | { type: MatchListAvailableAction.FETCH_MATCH_REQUEST }
  | {
      type: MatchListAvailableAction.FETCH_MATCH_SUCCESS;
      payload: MatchData[];
    }
  | {
      type: MatchListAvailableAction.FETCH_MATCH_FAILURE;
      payload: string;
    };

export type MatchDispatch = React.Dispatch<MatchActions>;
