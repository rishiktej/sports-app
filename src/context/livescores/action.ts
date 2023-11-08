import { API_ENDPOINT } from "../../config/constants";
import {
  MatchListAvailableAction,
  MatchDispatch,
} from "./types";

export const fetchMatch = async (
  dispatch: MatchDispatch,
) => {
  console.log("hello")
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: MatchListAvailableAction.FETCH_MATCH_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/matches`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Match");
    }

    const data = await response.json();
    console.log("data",data)
    dispatch({
      type: MatchListAvailableAction.FETCH_MATCH_SUCCESS,
      payload: data.matches,
    });
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({
      type: MatchListAvailableAction.FETCH_MATCH_FAILURE,
      payload: "Unable to load Match",
    });
  }
};

export const fetchMatchData = async (matchId: number) => {
    const token = localStorage.getItem("authToken") || "";
    try {
      const response = await fetch(`${API_ENDPOINT}/matches/${matchId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw Error("Failed to fetch Match Data");
      }

      const data = await response.json();
     return data
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };