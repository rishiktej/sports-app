import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Heading,
  Image,
  SimpleGrid,
  Text,
  Button,
  Select,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useArticleState } from "../../context/trendingnews/context";
import { API_ENDPOINT } from "../../config/constants";
import {
  usePreferencesDispatch,
  usePreferencesState,
} from "../../context/preferences/context";
import { fetchPreferences } from "../../context/preferences/action";

export default function FilterLayout() {
  const p_dispatch = usePreferencesDispatch();
  useEffect(() => {
    fetchPreferences(p_dispatch);
  }, []);
  type Team = {
    id: number;
    name: string;
    plays: string;
  };
  type Sport = {
    id: number;
    name: string;
  };

  const [sports, setSports] = useState<Sport[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const state = useArticleState();
  const { articles, isLoading, isError, errorMessage } = state;
  const preferences_data = usePreferencesState();
  const [selectedSport, setSelectedSport] = useState("all");
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [filteredArticles, setFilteredArticles] = useState<article[]>([]);
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setAuthenticated(!!authToken);
  }, []);

  console.log(preferences_data);
  const sportsInPreferences = preferences_data.preferences.sports || [];
  const teamsInPreferences = preferences_data.preferences.teams || [];
  // Fetch sports and teams data using useEffect
  useEffect(() => {
    async function fetchSports() {
      const sportsData = await fetchSportsData();
      setSports(sportsData);
    }

    async function fetchTeams() {
      const teamsData = await fetchTeamsData();
      setTeams(teamsData);
    }

    fetchSports();
    fetchTeams();
  }, []);

  // Fetch sports data
  const fetchSportsData = async () => {
    const token = localStorage.getItem("authToken") || "";
    try {
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
      return sportsData.sports;
    } catch (error) {
      console.error("Operation failed:", error);
      return [];
    }
  };

  // Fetch teams data
  const fetchTeamsData = async () => {
    const token = localStorage.getItem("authToken") || "";
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
      return teamsData;
    } catch (error) {
      console.error("Operation failed:", error);
      return [];
    }
  };

  // Update the filtered articles when the selected sport or team changes
  useEffect(() => {
    const filtered = articles.filter((article) => {
      const sportMatch =
        selectedSport === "all" || article.sport.name === selectedSport;
      const teamMatch =
        selectedTeam === "all" ||
        article.teams.some((team) => team.name === selectedTeam);
      return sportMatch && teamMatch;
    });

    setFilteredArticles(filtered);
  }, [selectedSport, selectedTeam, articles]);
  console.log(sports, teams);
  return (
    <div className="space-y-4">
      <div className="flex flex-row justify-between">
        <div>
          <label htmlFor="sport-select">Select a Sport:</label>
          <Select
            id="sport-select"
            className="bg-orange-100"
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
          >
            {authenticated
              ? sportsInPreferences.map((sport) => (
                  <option key={sport}>{sport}</option>
                ))
              : sports.map((sport) => (
                  <option key={sport.id} value={sport.name}>
                    {sport.name}
                  </option>
                ))}
          </Select>
        </div>
        <div>
          <label htmlFor="team-select">Select a Team:</label>
          <Select
            id="team-select"
            className="bg-slate-200 border-width: 2px"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            {authenticated
              ? teamsInPreferences.map((team) => (
                  <option key={team}>{team}</option>
                ))
              : teams.map((team) => (
                  <option key={team.id} value={team.name}>
                    {team.name}
                  </option>
                ))}
          </Select>
        </div>
      </div>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {filteredArticles.map((article) => (
          <div key={article.id} className="bg-white p-1 rounded shadow-sm">
            <Card
              w="300px"
              p="2"
              m="2"
              boxShadow="md"
              rounded="lg"
              border="1px solid #e2e8f0"
            >
              <Image
                objectFit="cover"
                maxH="150px"
                src={article.thumbnail}
                alt="Article Thumbnail"
              />
              <CardBody>
                <Heading
                  size="sm"
                  className="uppercase bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500"
                >
                  {" "}
                  {article.title}
                </Heading>
                <Text fontSize="xs" color="gray.500">
                  {" "}
                  Date: {new Date(article.date).toDateString()}
                </Text>
                <Text fontSize="xs" className="text-left ">
                  {" "}
                  Summary: {article.summary}.
                </Text>
                <Link to={`${article.id}`}>
                  <Button
                    size="sm"
                    className="bg-cyan-500 hover:bg-cyan-600 rounded border px-2"
                  >
                    Read More
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </div>
        ))}
      </SimpleGrid>
    </div>
  );
}
