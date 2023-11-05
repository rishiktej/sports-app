import { API_ENDPOINT } from "../../config/constants";
import { PreferencesDispatch, PreferencesListAvailableAction } from "./types";

export const fetchPreferences = async (dispatch: PreferencesDispatch) => {
    try {
      dispatch({ type: PreferencesListAvailableAction.FETCH_Preferences_REQUEST });
      const token = localStorage.getItem("authToken") || "";
      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to get preferences");
      }

      const data = await response.json();
      console.log("ppd",data)
      if (data.errors && data.errors.length > 0) {
        console.error("Failed to get preferences:", data.errors[0].message);
      } else {
         dispatch({
      type: PreferencesListAvailableAction.FETCH_Preferences_SUCCESS,
      payload: data.preferences,
    });
      }
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };
