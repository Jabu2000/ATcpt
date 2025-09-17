import API from "./api";

export const getRestaurants = async (params = {}) => {
  const res = await API.get("/restaurants", { params });
  return res.data;
};

export const getRestaurant = async (id) => {
  const res = await API.get(`/restaurants/${id}`);
  return res.data;
};

export const addRestaurantComment = async (id, data) => {
  const formData = new FormData();
  formData.append("text", data.text);
  if (data.images) data.images.forEach((img) => formData.append("images", img));
  if (data.ratings) formData.append("ratings", JSON.stringify(data.ratings));

  const res = await API.post(`/restaurants/${id}/comments`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
