import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const BusinessProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/business-registration");
      return;
    }

    axios
      .get(`${API_URL}/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setProfile(res.data);
        setUpdatedProfile(res.data);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/business-registration");
      });
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((p) => ({ ...p, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`${API_URL}/me`, updatedProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Update failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("business");
    navigate("/business-registration");
  };

  if (!profile) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-3xl p-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          Business Profile
        </h2>

        {editing ? (
          <div className="space-y-4">
            {[
              "businessName",
              "location",
              "contactNumber",
              "description",
              "operationHours",
              "googleRating",
              "category",
              "email",
            ].map((key) => (
              <div key={key}>
                <label className="block font-semibold capitalize mb-1">
                  {key}
                </label>
                <input
                  name={key}
                  value={updatedProfile[key] ?? ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            ))}

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white py-2 px-4 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setUpdatedProfile(profile);
                }}
                className="bg-gray-300 py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-gray-700">
            {[
              "businessName",
              "location",
              "contactNumber",
              "description",
              "operationHours",
              "googleRating",
              "category",
              "email",
            ].map((key) => (
              <p key={key}>
                <strong className="capitalize">
                  {key.replace(/([A-Z])/g, " $1")}:
                </strong>{" "}
                {profile[key] ?? "—"}
              </p>
            ))}

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setEditing(true)}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessProfile;
