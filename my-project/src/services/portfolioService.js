import API from "./api";

// --- Get saved adventures for the logged-in user ---
export const getSavedAdventures = async () => {
  try {
    const { data } = await API.get("/adventures/saved");
    return data; // array of adventures
  } catch (err) {
    console.error("Error fetching saved adventures:", err);
    throw err;
  }
};

// --- Add an adventure to saved ---
export const saveAdventure = async (adventureId) => {
  try {
    const { data } = await API.post(`/adventures/saved/${adventureId}`);
    return data;
  } catch (err) {
    console.error("Error saving adventure:", err);
    throw err;
  }
};

// --- Remove an adventure from saved ---
export const removeAdventure = async (adventureId) => {
  try {
    const { data } = await API.delete(`/adventures/saved/${adventureId}`);
    return data;
  } catch (err) {
    console.error("Error removing adventure:", err);
    throw err;
  }
};