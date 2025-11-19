import API from "./api"; // your axios instance
import { toast } from "react-hot-toast";

/**
 * Fetch saved adventures for the current user
 * GET /api/adventures/saved
 */
export const getSavedAdventures = async () => {
  try {
    const { data } = await API.get("/adventures/saved", { withCredentials: true });
    return data; // returns an array of adventures
  } catch (err) {
    console.error("Error fetching saved adventures:", err);
    toast.error("Failed to load saved adventures");
    return [];
  }
};

/**
 * Remove a saved adventure by ID
 * DELETE /api/adventures/saved/:id
 */
export const removeAdventure = async (type, refId) => {
  // type can be "adventure" for now
  try {
    await API.delete(`/adventures/saved/${refId}`, { withCredentials: true });
    toast.success("Removed from saved adventures");
  } catch (err) {
    console.error("Error removing saved adventure:", err);
    toast.error("Failed to remove adventure");
    throw err;
  }
};

/**
 * Save a new adventure (optional)
 * POST /api/adventures/save/:adventureId
 */
export const saveAdventure = async (adventureId) => {
  try {
    const { data } = await API.post(`/adventures/save/${adventureId}`, {}, { withCredentials: true });
    toast.success("Adventure saved!");
    return data;
  } catch (err) {
    console.error("Error saving adventure:", err);
    toast.error("Failed to save adventure");
    throw err;
  }
};