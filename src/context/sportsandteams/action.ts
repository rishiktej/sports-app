import { API_ENDPOINT } from "../../config/constants";
import { SportsDispatch, SportsListAvailableAction, TeamDispatch, TeamListAvailableAction } from "./types";

export const fetchSportsData = async ( dispatch: SportsDispatch) => {
    const token = localStorage.getItem("authToken") ?? "";
    try {
      dispatch({ type: SportsListAvailableAction.FETCH_Sports_REQUEST });
      const response = await fetch(`${API_ENDPOINT}/sports/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch sports data");
      }

      const sportsData = await response.json();
       dispatch({
      type: SportsListAvailableAction.FETCH_Sports_SUCCESS,
      payload: sportsData.sports,
    });
    } catch (error) {
      console.error("Operation failed:", error);
      return [];
    }
  };
  // Fetch teams data
export const fetchTeamsData = async (dispatch: TeamDispatch) => {
    const token = localStorage.getItem("authToken") ?? "";
    try {
      const response = await fetch(`${API_ENDPOINT}/teams/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw Error("Failed to fetch teams data");
      }

      const teamsData = await response.json();
    dispatch({
      type: TeamListAvailableAction.FETCH_Team_SUCCESS,
      payload: teamsData,
    });
    } catch (error) {
      console.error("Operation failed:", error);
      return [];
    }
  };