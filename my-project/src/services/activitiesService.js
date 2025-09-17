import API from "./api";

export const getActivities = async (params = {}) => {
  const res = await API.get("/activities", { params });
  return res.data;
};

export const getActivity = async (id) => {
  const res = await API.get(`/activities/${id}`);
  return res.data;
};

export const addActivityComment = async (id, data) => {
  const formData = new FormData();
  formData.append("text", data.text);
  if (data.images) data.images.forEach((img) => formData.append("images", img));
  if (data.ratings) formData.append("ratings", JSON.stringify(data.ratings));

  const res = await API.post(`/activities/${id}/comments`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
