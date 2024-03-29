import React, { useEffect, useState } from "react";
import MatchListItems from "./livescores";
import UserMatchlist from "./userlivescores";
import { fetchMatch } from "../../context/livescores/action";
import {
  useMatchDispatch,
  useMatchState,
} from "../../context/livescores/context";
import ArticleList from "./news";
import FilterLayout from "./filterlayout";
import { match } from "../../context/livescores/types";
import { API_ENDPOINT } from "../../config/constants";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const MatchList: React.FC = () => {
  const { t, i18n: i18nInstance } = useTranslation();
  const matchdispatch = useMatchDispatch();
  console.log("md", matchdispatch);
  useEffect(() => {
    fetchMatch(matchdispatch);
  }, [matchdispatch]);
  const state = useMatchState();
  const { matches, isLoading, isError, errorMessage } = state;
  const [selectedMatches, setselectedMatches] = useState<match[]>([]);
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setAuthenticated(!!authToken);
  }, []);
  console.log("smm", selectedMatches);
  const fetchMatchData = async (matchId: number) => {
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
      setselectedMatches((prevSelectedMatches) => [
        ...prevSelectedMatches,
        data,
      ]);
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };
  useEffect(() => {
    const latestMatches = matches
      .sort(
        (a, b) => new Date(b.endsAt).getTime() - new Date(a.endsAt).getTime()
      )
      .slice(0, 5);
    latestMatches.forEach((match) => {
      fetchMatchData(match.id);
    });
  }, [matches]);
  console.log(selectedMatches);

  const storedLanguage = localStorage.getItem("selectedLanguage");
  const initialLanguage = storedLanguage || "en";

  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "zh", label: "中文" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "ja", label: "日本語" },
  ];
  const date = new Date();
  const currencyValue = 12345.67;

  const langString = selectedLanguage + "-" + selectedLanguage.toUpperCase();
  console.log("ls=", langString);

  const dateFormatter = new Intl.DateTimeFormat(langString, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat(langString, {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const currencyFormatter = new Intl.NumberFormat(langString, {
    style: "currency",
    currency: "INR",
  });

  const formattedDate = dateFormatter.format(date);
  const formattedTime = timeFormatter.format(date);
  const formattedCurrency = currencyFormatter.format(currencyValue);
  useEffect(() => {
    localStorage.setItem("selectedLanguage", selectedLanguage);
    i18nInstance.changeLanguage(selectedLanguage);
  }, [selectedLanguage, i18nInstance]);

  return (
    <>
      <h3 className="text-l font-bold font-custom">
        {" "}
        Date : {formattedDate} <br /> Time : {formattedTime} <br /> Currency :{" "}
        {formattedCurrency}{" "}
      </h3>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="button"
        onClick={() => {
          throw new Error("Sentry Test Error");
        }}
      >
        Break the world
      </button>
      <div>
        {authenticated ? (
          <UserMatchlist />
        ) : (
          <MatchListItems
            selectedMatches={selectedMatches}
            onRefreshMatch={(matchId) => {
              fetchMatchData(parseInt(matchId));
            }}
          />
        )}
      </div>
      <div className="flex items-center mb-4">
        <h2 className="mr-2">{t("Select Language:")}</h2>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          {languageOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-auto p-4">
          <h2 className="text-2xl font-medium tracking-tight text-slate-700 mb-4">
            {t("Latest Articles")}
          </h2>
          <ArticleList />
        </div>
        <div className="md:w-auto p-4">
          <h2 className="text-2xl font-medium tracking-tight text-slate-700 mb-4">
            {t("Filter by Sport and Team")}
          </h2>
          <FilterLayout />
        </div>
      </div>
    </>
  );
};

export default MatchList;
