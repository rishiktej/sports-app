import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  useSportsDispatch,
  useSportsState,
} from "../../context/sportsandteams/sportscontext";
import {
  fetchSportsData,
  fetchTeamsData,
} from "../../context/sportsandteams/action";
import {
  useTeamsDispatch,
  useTeamsState,
} from "../../context/sportsandteams/teamscontext";
import { API_ENDPOINT } from "../../config/constants";

interface PreferencesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePreferences: (
    selectedSports: string[],
    selectedTeams: string[]
  ) => void;
}

const PreferencesDialog: React.FC<PreferencesDialogProps> = ({
  isOpen,
  onClose,
  onSavePreferences,
}) => {
  const sportsdispatch = useSportsDispatch();
  useEffect(() => {
    fetchSportsData(sportsdispatch);
  }, []);
  const teamsdispatch = useTeamsDispatch();
  useEffect(() => {
    fetchTeamsData(teamsdispatch);
  }, []);
  const sports_state = useSportsState();
  const teams_state = useTeamsState();
  const { sports, isLoading, isError, errorMessage } = sports_state;
  const { teams } = teams_state;
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  const updatePreferences = async (selectedSports, selectedTeams) => {
    try {
      const token = localStorage.getItem("authToken") ?? "";
      const preferences = {
        teams: selectedTeams,
        sports: selectedSports,
        matches: [],
        articles: [],
      };

      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ preferences }),
      });

      if (!response.ok) {
        throw Error("Failed to update preferences");
      }

      const data = await response.json();

      if (data.errors && data.errors.length > 0) {
        return { ok: false, error: data.errors[0].message };
      }

      return { ok: true };
    } catch (error) {
      console.error("Operation failed:", error);
      return { ok: false, error };
    }
  };

  const getPreferences = async () => {
    try {
      const token = localStorage.getItem("authToken") ?? "";
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

      if (data.errors && data.errors.length > 0) {
        console.error("Failed to get preferences:", data.errors[0].message);
      } else {
        // Set the selected preferences from the fetched data
        setSelectedSports(data.preferences.sports);
        setSelectedTeams(data.preferences.teams);
      }
    } catch (error) {
      console.error("Operation failed:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Fetch and set the selected preferences when the dialog is opened
      getPreferences();
    }
  }, [isOpen]);

  const handleSavePreferences = () => {
    onSavePreferences(selectedSports, selectedTeams);
    updatePreferences(selectedSports, selectedTeams).then((result) => {
      if (result.ok) {
        // Preferences saved successfully, reload the page
        window.location.reload();
      } else {
        // Handle errors or display a message to the user
        console.error("Failed to save preferences:", result.error);
        // You can also display an error message to the user
      }
    });
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <h2 className="text-2xl font-semibold mb-4">Preferences</h2>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Select Sports:</h3>
            {sports.map((sport) => (
              <div key={sport.id}>
                <input
                  type="checkbox"
                  value={sport.name}
                  onChange={() =>
                    setSelectedSports((prevSports) =>
                      prevSports && prevSports.includes(sport.name)
                        ? prevSports.filter((item) => item !== sport.name)
                        : [...(prevSports || []), sport.name]
                    )
                  }
                  checked={
                    selectedSports ? selectedSports.includes(sport.name) : false
                  }
                />{" "}
                {sport.name}
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Select Teams:</h3>
            {teams.map((team) => (
              <div key={team.id}>
                <input
                  type="checkbox"
                  value={team.name}
                  onChange={() =>
                    setSelectedTeams((prevTeams) =>
                      prevTeams && prevTeams.includes(team.name)
                        ? prevTeams.filter((item) => item !== team.name)
                        : [...(prevTeams || []), team.name]
                    )
                  }
                  checked={
                    selectedTeams ? selectedTeams.includes(team.name) : false
                  }
                />{" "}
                {team.name}
              </div>
            ))}
          </div>

          <button
            onClick={handleSavePreferences}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Save Preferences
          </button>

          <button
            onClick={onClose}
            className="mt-4 ml-2 text-blue-500 hover:underline"
          >
            Close
          </button>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PreferencesDialog;
