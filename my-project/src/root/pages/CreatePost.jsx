import React, { useState } from "react";
import { createPost } from "../../services/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ currentUser, onPostCreated }) => {
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return toast.error("Description cannot be empty");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("content", content);
      if (hashtags.trim()) formData.append("hashtags", hashtags);
      if (image) formData.append("image", image);

      const data = await createPost(formData);

      // toast.success("Post created!");

      // Reset form
      setContent("");
      setHashtags("");
      setImage(null);
      setPreview(null);

      // Push new post to parent state if provided
      if (onPostCreated) onPostCreated(data);

      // Redirect to home page after a short delay to show toast
      setTimeout(() => {
        navigate("/");
      }, 500); // 0.5s delay
    } catch (err) {
      console.error(err);
      toast.error("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg bg-white rounded-xl shadow p-4 flex flex-col gap-3"
    >
      {currentUser && (
        <div className="flex items-center gap-3">
          <img
            src={currentUser.profilePicture || "/default-avatar.png"}
            alt={currentUser.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold">{currentUser.username}</span>
        </div>
      )}

      <textarea
        placeholder="Write a description..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 rounded-md resize-none"
        rows={4}
      />

      <input
        type="text"
        placeholder="#hashtags (comma separated)"
        value={hashtags}
        onChange={(e) => setHashtags(e.target.value)}
        className="border p-2 rounded-md"
      />

      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={() => {
              setImage(null);
              setPreview(null);
            }}
            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-sm rounded"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
