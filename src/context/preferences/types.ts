export type Preferences={
    teams:[],
    sports:[],
    matches:[],
    articles:[]
};
export type PreferencesListState = {
  preferences: Preferences[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};
export enum PreferencesListAvailableAction {
  // ... (existing actions)
  FETCH_Preferences_REQUEST = "FETCH_Preferences_REQUEST",
  FETCH_Preferences_SUCCESS = "FETCH_Preferences_SUCCESS",
  FETCH_Preferences_FAILURE = "FETCH_Preferences_FAILURE",
}


export type preferencesActions =
  | { type: PreferencesListAvailableAction.FETCH_Preferences_REQUEST }
  | {
      type: PreferencesListAvailableAction.FETCH_Preferences_SUCCESS;
      payload: Preferences[];
    }
  | {
      type: PreferencesListAvailableAction.FETCH_Preferences_FAILURE;
      payload: string;
    };

export type PreferencesDispatch = React.Dispatch<preferencesActions>;