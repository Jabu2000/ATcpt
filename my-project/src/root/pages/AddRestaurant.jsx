import React, { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const AddRestaurant = () => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    cuisine: "",
    image: "",
    rating: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("address", form.address);
    formData.append("phone", form.phone);
    formData.append("cuisine", form.cuisine);
    formData.append("rating", form.rating);
    if (form.imageFile) formData.append("image", form.imageFile);

    try {
      const res = await fetch(`${API_URL}/api/restaurants`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to add restaurant");
      setMessage("✅ Restaurant added successfully!");
      setForm({
        name: "",
        address: "",
        phone: "",
        cuisine: "",
        imageFile: null,
        rating: "",
      });
    } catch (err) {
      setMessage("❌ Error: " + err.message);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        ➕ Add New Restaurant
      </h1>
      {message && <p className="text-center mb-4">{message}</p>}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="cuisine"
          placeholder="Cuisine"
          value={form.cuisine}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setForm({ ...form, imageFile: e.target.files[0] })}
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (0-5)"
          step="0.1"
          value={form.rating}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg"
        >
          Add Restaurant
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;
