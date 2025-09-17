import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiFetch } from "../lib/api";

export default function Comments({ postId }) {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchComments = async () => {
    try {
      const data = await apiFetch(`/posts/${postId}/comments`);
      setComments(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const newComment = await apiFetch(`/posts/${postId}/comment`, {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      setComments((p) => [newComment, ...p]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-3">
      <form onSubmit={submit} className="flex gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a comment…" className="flex-1 p-2 border rounded" />
        <button type="submit" className="px-3 py-1 bg-sky-600 text-white rounded">Send</button>
      </form>

      <ul className="mt-3 space-y-2">
        {comments.map((c) => (
          <li key={c._id} className="text-sm bg-slate-50 p-2 rounded">
            <strong className="text-xs text-slate-600">{c.userId?.name || "Anonymous"}</strong>
            <div>{c.text}</div>
            <div className="text-xs text-slate-400">{new Date(c.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}