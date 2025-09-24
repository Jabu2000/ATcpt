import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import API from "../../services/api";
import {
  getSavedAdventures,
  removeAdventure,
} from "../../services/portfolioService";
import { GalleryPost, SavedAdventureItem } from "./ProfileScrollTab";
import AdventurePlanner from "./AdventurePlanner";
import { useAuth } from "../../auth/AuthContext";

const API_BASE = "http://localhost:4000";

const ProfileInfo = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    profilePicture: "",
    description: "",
  });
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  // Tabs
  const tabs = ["Saved Adventures", "Gallery", "Adventure Planner"];
  const [activeTab, setActiveTab] = useState(0);
  const tabVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const [savedAdventures, setSavedAdventures] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(false);
  const [plannedCount, setPlannedCount] = useState(0);

  const [galleryPosts, setGalleryPosts] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [newPostFile, setNewPostFile] = useState(null);
  const [creatingPost, setCreatingPost] = useState(false);

  // Sync formData when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        profilePicture: user.profilePicture || "",
        description: user.description || "",
      });
    }
  }, [user]);

  // Load saved adventures
  const loadSavedAdventures = async () => {
    if (!user) return;
    setLoadingSaved(true);
    try {
      const saved = await getSavedAdventures();
      setSavedAdventures(saved);
    } catch {
      toast.error("Failed to load saved adventures");
    } finally {
      setLoadingSaved(false);
    }
  };

  useEffect(() => {
    loadSavedAdventures();
  }, [user]);

  const handleRemove = async (id, type, refId) => {
    try {
      await removeAdventure(type, refId);
      setSavedAdventures((prev) => prev.filter((a) => a._id !== id));
      toast.success("Removed from saved");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove adventure");
    }
  };

  // Gallery fetch
  useEffect(() => {
    if (!user) return;
    const fetchUserPosts = async () => {
      setLoadingGallery(true);
      try {
        const { data } = await API.get(`/posts/user/${user.id}`);
        setGalleryPosts(data);
      } catch (err) {
        console.error("Error fetching gallery:", err);
      } finally {
        setLoadingGallery(false);
      }
    };
    fetchUserPosts();
  }, [user]);

  // Gallery actions
  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content) {
      return toast.error("Please enter a title and content");
    }
    const fd = new FormData();
    fd.append("title", newPost.title);
    fd.append("content", newPost.content);
    if (newPostFile) fd.append("image", newPostFile);

    try {
      setCreatingPost(true);
      const { data } = await API.post("/posts", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setGalleryPosts([data, ...galleryPosts]);
      setNewPost({ title: "", content: "" });
      setNewPostFile(null);
      toast.success("Post created!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create post");
    } finally {
      setCreatingPost(false);
    }
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await API.delete(`/posts/${id}`);
      setGalleryPosts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Post deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete post");
    }
  };

  // Profile picture upload
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles?.[0];
      if (!file) return;

      setUploading(true);
      setMsg("");

      try {
        const fd = new FormData();
        fd.append("profilePic", file);

        const res = await fetch(`${API_BASE}/api/auth/upload-profile`, {
          method: "POST",
          body: fd,
          credentials: "include",
        });

        const data = await res.json();

        if (data?.user) {
          setUser(data.user); // update auth
          setFormData((prev) => ({
            ...prev,
            profilePicture: data.user.profilePicture,
          }));
          setMsg("Uploaded ✔");
        } else {
          setMsg("Upload failed");
        }
      } catch (err) {
        console.error(err);
        setMsg("Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [setUser]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  // --- Save profile ---
  const handleSaveProfile = async () => {
    setMsg("");
    try {
      const res = await fetch(`${API_BASE}/api/auth/profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      setUser(data.user);
      setIsEditing(false);
      setMsg("✅ Profile updated!");
    } catch (err) {
      setMsg(err.message);
    }
  };

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  if (!user) return <p className="pt-[150px] px-[150px]">Loading...</p>;

  // --- Avatar logic ---
  const avatar =
    formData.profilePicture ||
    user?.profilePicture ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.username || "User"
    )}`;

  return (
    <div className="w-full pt-[150px]">
      {/* Header */}
      <div className="flex flex-row justify-between px-[150px]">
        <img
          src={avatar}
          alt="profile"
          className="h-[13rem] w-[13rem] rounded-full object-cover border-4 border-[#AEFF53]"
        />
        <div className="flex flex-col">
          <h1 className="text-[68px] font-bold text-black">
            Welcome, {formData.username}!
          </h1>
          <div className="flex gap-8 text-[16px] mt-4 text-gray-700">
            <div>
              <span className="font-semibold text-black">
                {savedAdventures.length}
              </span>{" "}
              Saved Adventures
            </div>
            <div>
              <span className="font-semibold text-black">
                {galleryPosts.length}
              </span>{" "}
              Gallery Images
            </div>
            <div>
              <span className="font-semibold text-black">{plannedCount}</span>{" "}
              Planned Adventures
            </div>
          </div>
          <p className="text-[16px] text-black w-[400px] mt-4">
            {formData.description || "No description yet"}
          </p>
        </div>

        {!isEditing ? (
          <button
            onClick={() => {
              setMsg("");
              setIsEditing(true);
            }}
            className="bg-[#2F9715] hover:bg-[#9ae745] text-[18px] text-white font-semibold px-6 h-10 rounded-2xl"
          >
            Edit Profile
          </button>
        ) : (
          <div className="w-full mt-6 flex flex-col gap-4">
            {/* Username */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1 text-gray-700">
                Username
              </label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1 text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a short description..."
                rows="3"
                className="w-full border rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Profile Picture */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1 text-gray-700">
                Profile Picture
              </label>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? "bg-green-100 border-green-400"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                <input {...getInputProps()} />
                {uploading ? (
                  <p className="text-gray-500">Uploading...</p>
                ) : isDragActive ? (
                  <p className="text-gray-700">Drop image here...</p>
                ) : (
                  <p className="text-gray-700">
                    Drag & drop or click to upload
                  </p>
                )}
              </div>

              {/* Optional paste URL */}
              <input
                name="profilePicture"
                value={formData.profilePicture}
                onChange={handleChange}
                placeholder="...or paste image URL"
                className="w-full border rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />

              {/* Live preview */}
              {formData.profilePicture && (
                <div className="mt-3">
                  <p className="text-gray-600 mb-1">Preview:</p>
                  <img
                    src={avatar}
                    alt="Preview"
                    className="h-32 w-32 rounded-full object-cover border-2 border-green-400"
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={handleSaveProfile}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setMsg("");
                  setFormData({
                    username: user.username,
                    profilePicture: user.profilePicture,
                    description: user.description,
                  });
                }}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-full"
              >
                Cancel
              </button>
            </div>

            {msg && <p className="mt-3 text-sm text-red-500">{msg}</p>}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="w-full pt-[100px]">
        <div className="flex border-b border-gray-300 mt-8 px-[150px] relative">
          {tabs.map((tab, idx) => (
            <button
              key={tab}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 py-3 text-center text-[28px] font-bold ${
                activeTab === idx ? "text-black" : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
          <motion.div
            layout
            className="absolute bottom-0 h-1 bg-black"
            style={{
              width: `${100 / tabs.length}%`,
              left: `${(100 / tabs.length) * activeTab}%`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        <div className="relative min-h-[300px] px-[150px] mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabVariants}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 0 && (
                <>
                  {loadingSaved ? (
                    <p>Loading...</p>
                  ) : savedAdventures.length === 0 ? (
                    <p>No saved adventures yet.</p>
                  ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {savedAdventures.map((item) => (
                        <SavedAdventureItem
                          key={item._id}
                          item={item}
                          onRemove={handleRemove}
                        />
                      ))}
                    </ul>
                  )}
                </>
              )}

              {activeTab === 1 && (
                <>
                  <div className="mb-6 p-4 border rounded-lg shadow-sm bg-white">
                    <h3 className="text-xl font-semibold mb-3">
                      Create New Post
                    </h3>
                    <input
                      type="text"
                      placeholder="Post Title"
                      className="w-full border rounded px-3 py-2 mb-3"
                      value={newPost.title}
                      onChange={(e) =>
                        setNewPost({ ...newPost, title: e.target.value })
                      }
                    />
                    <textarea
                      placeholder="Post Content"
                      rows="3"
                      className="w-full border rounded px-3 py-2 mb-3 resize-none"
                      value={newPost.content}
                      onChange={(e) =>
                        setNewPost({ ...newPost, content: e.target.value })
                      }
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewPostFile(e.target.files[0])}
                      className="mb-3"
                    />
                    <button
                      onClick={handleCreatePost}
                      disabled={creatingPost}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
                    >
                      {creatingPost ? "Uploading..." : "Add Post"}
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    {loadingGallery ? (
                      <p>Loading gallery...</p>
                    ) : galleryPosts.length === 0 ? (
                      <p>No gallery posts yet.</p>
                    ) : (
                      galleryPosts.map((post) => (
                        <GalleryPost
                          key={post._id}
                          post={post}
                          onDelete={handleDeletePost}
                        />
                      ))
                    )}
                  </div>
                </>
              )}

              {activeTab === 2 && (
                <AdventurePlanner
                  onPlansChange={(plans) => setPlannedCount(plans.length)}
                />
              )}
            </motion.div>
          </AnimatePresence>
          {msg && !isEditing && (
            <p className="mt-4 text-sm text-red-500">{msg}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
