import React, { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import API from "../../lib/axios";
import {
  getSavedAdventures,
  removeAdventure,
} from "../../services/portfolioService";
import { GalleryPost, SavedAdventureItem } from "./ProfileScrollTab";
import AdventurePlanner from "./AdventurePlanner";
import { useAuth } from "../../context/AuthContext";
import { Bookmark, Image, Map } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";

const ProfileInfo = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    description: "",
    profilePicture: "",
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

  // Data states
  const [savedAdventures, setSavedAdventures] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(false);

  const [galleryPosts, setGalleryPosts] = useState([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [activePostId, setActivePostId] = useState(null);

  const [plannedCount, setPlannedCount] = useState(0);

  // Sync formData when user changes
  useEffect(() => {
    if (user)
      setFormData({
        username: user.username || "",
        profilePicture: user.profilePicture || "",
        description: user.description || "",
      });
  }, [user]);

  // --- Saved Adventures ---
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
    } catch {
      toast.error("Failed to remove adventure");
    }
  };

  // --- Gallery ---
  useEffect(() => {
    if (!user) return;
    const fetchUserPosts = async () => {
      setLoadingGallery(true);
      try {
        const { data } = await API.get(`/posts/user/${user._id}`);
        setGalleryPosts(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load gallery");
      } finally {
        setLoadingGallery(false);
      }
    };
    fetchUserPosts();
  }, [user]);

  const handleDeletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await API.delete(`/posts/${id}`);
      setGalleryPosts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Post deleted!");
    } catch {
      toast.error("Failed to delete post");
    }
  };

  // --- Profile Picture Upload ---
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setUploading(true);
      setMsg("");

      try {
        const fd = new FormData();
        fd.append("profilePic", file);

        const res = await fetch(`${API.defaults.baseURL}/auth/upload-profile`, {
          method: "POST",
          body: fd,
          credentials: "include",
        });

        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          setFormData((prev) => ({
            ...prev,
            profilePicture: data.user.profilePicture,
          }));
          toast.success("Profile picture updated!");
        } else {
          setMsg("Upload failed");
        }
      } catch {
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

  // --- Save Profile ---
  const handleSaveProfile = async () => {
    try {
      const res = await fetch(`${API.defaults.baseURL}/auth/profile`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      setUser(data.user);
      setIsEditing(false);
      toast.success("Profile updated!");
    } catch (err) {
      setMsg(err.message);
    }
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  if (!user) return <p className="pt-[150px] px-[150px]">Loading...</p>;

  const avatar =
    formData.profilePicture ||
    user.profilePicture ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user.username || "User"
    )}`;

  return (
    <div className="w-full pt-[120px] pb-[50px]">
      {/* Profile Header */}
      <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8 md:items-center items-start justify-center px-4">
        <div className="flex flex-row gap-4">
          <img
            src={avatar}
            alt="profile"
            className="h-[8rem] w-[8rem] md:h-[10rem] md:w-[10rem] rounded-full object-cover border-2 border-green-500"
          />
          <h1 className="flex md:hidden text-[28px] sm:text-[32px] md:text-[38px] font-bold text-black">
            Welcome, {formData.username}!
          </h1>
        </div>
        <div className="flex flex-col md:flex-row md:items-start md:gap-6 w-full md:w-auto">
          <div className="flex flex-col">
            <h1 className="md:flex hidden text-[28px] sm:text-[32px] md:text-[38px] font-bold text-black">
              Welcome, {formData.username}!
            </h1>
            <div className="flex flex-wrap gap-4 sm:gap-6 text-[14px] sm:text-[16px] mt-3 text-gray-700">
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
                Gallery
              </div>
              <div>
                <span className="font-semibold text-black">{plannedCount}</span>{" "}
                Planned Adventures
              </div>
            </div>
            <p className="text-[14px] sm:text-[16px] text-black max-w-[350px] mt-3">
              {formData.description || "No description yet"}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex">
            <button
              onClick={() => {
                setMsg("");
                setIsEditing(true);
              }}
              className="px-6 py-2 bg-green-500 text-white rounded-2xl hover:bg-[#FF0000]"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Edit Overlay */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl max-w-4xl p-8 relative"
          >
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="md:text-2xl text-[16px] font-bold text-gray-800 mb-4">
              Edit Profile
            </h2>

            <div className="w-[300px] md:w-[400px] flex flex-col md:gap-4 gap-2 pt-2">
              <label className="block text-black md:text-[16px] text-[12px] font-semibold mb-1">
                Username
              </label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="rounded-lg px-4 py-2 border-2 border-black w-full"
              />

              <label className="block text-black md:text-[16px] text-[12px] font-semibold mb-1 mt-4">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="rounded-lg px-4 py-2 border-2 border-black w-full"
              />

              <label className="block text-black md:text-[16px] text-[12px] font-semibold mb-1 mt-4">
                Profile Picture
              </label>
              <div
                {...getRootProps()}
                className={`border-2 border-black rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? "bg-green-100 border-green-400"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                <input {...getInputProps()} />
                {uploading ? (
                  <p className="text-gray-500">Uploading...</p>
                ) : (
                  <p className="text-gray-700">Click or drag to upload</p>
                )}
              </div>

              {formData.profilePicture && (
                <div className="mt-3">
                  <p className="text-gray-600 mb-1">Preview:</p>
                  <img
                    src={avatar}
                    alt="Preview"
                    className="h-24 w-24 rounded-full object-cover border-2 border-green-400"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={handleSaveProfile}
                className="bg-[#AEFF53] hover:bg-green-400 px-6 py-2 rounded-full shadow-md"
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
                className="bg-[#FF0000] hover:bg-red-500 px-6 py-2 rounded-full shadow-md"
              >
                Cancel
              </button>
            </div>

            {msg && <p className="mt-3 text-sm text-red-500">{msg}</p>}
          </motion.div>
        </div>
      )}

      {/* Tabs */}
      <div className="w-full flex flex-col justify-center items-center md:pt-[100px] pt-[50px]">
        <div className="xl:w-[1200px] w-[93vw] sticky top-0 z-10 bg-white">
          <div className="flex border-b border-gray-300 mt-8 relative">
            {tabs.map((tab, idx) => {
              const icons = [
                <Bookmark key="s" />,
                <Image key="g" />,
                <Map key="p" />,
              ];
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(idx)}
                  className={`flex-1 py-3 flex items-center justify-center gap-2 font-bold text-[14px] md:text-[26px] transition-colors ${
                    activeTab === idx ? "text-black" : "text-gray-500"
                  }`}
                >
                  <span className="md:hidden">
                    <Tooltip.Provider>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>{icons[idx]}</Tooltip.Trigger>
                        <Tooltip.Content side="top">
                          <p>{tab}</p>
                        </Tooltip.Content>
                      </Tooltip.Root>
                    </Tooltip.Provider>
                  </span>
                  <span className="hidden md:block">{tab}</span>
                </button>
              );
            })}

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
        </div>

        <div className="relative xl:w-[1200px] w-[93vw] mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabVariants}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 0 &&
                (loadingSaved ? (
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
                ))}

              {activeTab === 1 &&
                (loadingGallery ? (
                  <p>Loading gallery...</p>
                ) : galleryPosts.length === 0 ? (
                  <p>No gallery posts yet.</p>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {galleryPosts.map((post) => (
                      <GalleryPost
                        key={post._id}
                        post={post}
                        onDelete={handleDeletePost}
                        activePostId={activePostId}
                        setActivePostId={setActivePostId}
                      />
                    ))}
                  </div>
                ))}

              {activeTab === 2 && (
                <div className="pb-[50px] md:px-[20px]">
                  <AdventurePlanner
                    onPlansChange={(plans) => setPlannedCount(plans.length)}
                  />
                </div>
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
