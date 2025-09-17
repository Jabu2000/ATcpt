import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { API, apiFetch } from "../lib/api";
import Comments from "../components/Comments";

export default function PostCard({ post, onDeleted }) {
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(post.likes?.some((id) => id === (user?._id)) ?? false);
  const [likesCount, setLikesCount] = useState(post.likes?.length ?? 0);
  const [showComments, setShowComments] = useState(false);

  const toggleLike = async () => {
    try {
      const data = await apiFetch(`/posts/${post._id}/like`, { method: "POST" });
      setLikesCount(data.likesCount);
      setLiked(data.liked);
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this post?")) return;
    try {
      await apiFetch(`/posts/${post._id}`, { method: "DELETE" });
      if (onDeleted) onDeleted(post._id);
    } catch (err) {
      console.error("Delete failed", err);
      alert(err.msg || "Delete failed");
    }
  };

  return (
    <article className="bg-white rounded shadow p-4">
      {post.imageUrl ? (
        <img src={`${API.replace("/api", "")}${post.imageUrl}`} alt={post.title} className="w-full h-40 object-cover rounded mb-3" />
      ) : (
        <div className="w-full h-40 bg-slate-100 rounded mb-3 flex items-center justify-center text-slate-400">No image</div>
      )}

      <h3 className="font-semibold text-lg">{post.title}</h3>
      <p className="text-sm text-slate-500">
        {post.category} • {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p className="mt-2 text-sm">{post.description}</p>

      <div className="flex items-center gap-4 mt-3">
        <button onClick={toggleLike} className="flex items-center gap-2">
          <span className={`select-none ${liked ? "text-red-600" : ""}`}>{liked ? "♥" : "♡"}</span>
          <span>{likesCount}</span>
        </button>

        <button onClick={() => setShowComments((s) => !s)}>{showComments ? "Hide comments" : "Comments"}</button>

        {user && post.userId === user._id && (
          <button onClick={handleDelete} className="ml-auto text-red-600">Delete</button>
        )}
      </div>

      {showComments && <Comments postId={post._id} />}
    </article>
  );
}
