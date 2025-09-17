import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { addComment, deleteComment } from "../../services/api";
import { toast } from "react-hot-toast";

const PostItem = ({ post, currentUser, onPostUpdated }) => {
  const [commentText, setCommentText] = useState("");

  const handleAddComment = async () => {
    if (!commentText.trim()) return toast.error("Comment cannot be empty");
    try {
      const { data } = await addComment(post._id, { text: commentText });
      setCommentText("");

      // Send updated post back to parent to refresh
      if (onPostUpdated) onPostUpdated(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add comment");
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden">
      {/* ... post content ... */}

      {/* Comments */}
      <div className="p-4">
        {post.comments?.map((c) => (
          <div key={c._id} className="flex items-center gap-2 mb-2">
            <img
              src={c.userId?.profilePicture || "/default-avatar.png"}
              alt={c.userId?.username || "User"}
              className="w-6 h-6 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">
                {c.userId?.username || "Unknown User"}
              </span>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
              </span>
              <p className="text-gray-600">{c.text}</p>
            </div>
          </div>
        ))}

        {/* Add comment */}
        {currentUser && (
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 border p-2 rounded-md"
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-600 text-white px-3 py-1 rounded-md"
            >
              Comment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostItem;