import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-hot-toast";

const ProfileExplore = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [posts, setPosts] = useState([]);

  const fetchUserPosts = async () => {
    try {
      const { data } = await API.get(`/posts/user/${user.id}`);
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) fetchUserPosts();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/posts/${id}`);
      setPosts(posts.filter((p) => p._id !== id));
      toast.success("Post deleted");
    } catch (err) {
      toast.error("Failed to delete post");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">My Posts</h2>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        {posts.map((post) => (
          <div key={post._id} className="relative group bg-white rounded-lg shadow-md">
            {post.image && <img src={post.image} alt="" className="rounded-lg" />}
            <div className="p-4">
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-gray-600">{post.content}</p>
            </div>
            <button
              onClick={() => handleDelete(post._id)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileExplore;
