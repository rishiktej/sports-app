export type Team = {
    id: number;
    name: string;
    plays: string;
  };
export type Sport = {
    id: number;
    name: string;
  };
export type TeamData = Team;
export type TeamListState = {
  teams: TeamData[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};
export enum TeamListAvailableAction {
  // ... (existing actions)
  FETCH_Team_REQUEST = "FETCH_Team_REQUEST",
  FETCH_Team_SUCCESS = "FETCH_Team_SUCCESS",
  FETCH_Team_FAILURE = "FETCH_Team_FAILURE",
}

// Add a new action type for Team
export type TeamActions =
  | { type: TeamListAvailableAction.FETCH_Team_REQUEST }
  | {
      type: TeamListAvailableAction.FETCH_Team_SUCCESS;
      payload: TeamData[];
    }
  | {
      type: TeamListAvailableAction.FETCH_Team_FAILURE;
      payload: string;
    };

export type TeamDispatch = React.Dispatch<TeamActions>;

//sports..

export type SportsData = Sport;
export type SportsListState = {
  sports: SportsData[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};
export enum SportsListAvailableAction {
  // ... (existing actions)
  FETCH_Sports_REQUEST = "FETCH_Sports_REQUEST",
  FETCH_Sports_SUCCESS = "FETCH_Sports_SUCCESS",
  FETCH_Sports_FAILURE = "FETCH_Sports_FAILURE",
}

// Add a new action type for Sports
export type SportsActions =
  | { type: SportsListAvailableAction.FETCH_Sports_REQUEST }
  | {
      type: SportsListAvailableAction.FETCH_Sports_SUCCESS;
      payload: SportsData[];
    }
  | {
      type: SportsListAvailableAction.FETCH_Sports_FAILURE;
      payload: string;
    };

export type SportsDispatch = React.Dispatch<SportsActions>;