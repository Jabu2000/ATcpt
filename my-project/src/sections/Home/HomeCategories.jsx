import React, { useEffect, useState } from "react";
import { getPosts } from "../../services/api";
import { formatDistanceToNow } from "date-fns";

const HomeCategories = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const { data } = await getPosts();
      setPosts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="w-full flex flex-col items-center mt-[70px]">
      <h2 className="text-[40px] sm:text-[50px] font-bold">Explore Posts</h2>

      <div className="grid md:grid-cols-1 gap-8 mt-6 w-full max-w-2xl">
        {posts.map((post) => (
          <div
            key={post._id}
            className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 pt-4">
              <img
                src={post.userId?.profilePicture || "/default-avatar.png"}
                alt={post.userId?.username || "User"}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">
                  {post.userId?.username || "Unknown User"}
                </span>
                <span className="text-sm text-gray-500">
                  {post.createdAt
                    ? formatDistanceToNow(new Date(post.createdAt), {
                        addSuffix: true,
                      })
                    : "Just now"}
                </span>
              </div>
            </div>
            {post.image && (
              <img
                src={post.image}
                alt={post.content}
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-4 flex flex-col gap-2">
              <p className="text-gray-600">{post.content}</p>
              {post.hashtags && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {Array.isArray(post.hashtags)
                    ? post.hashtags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-blue-600 font-medium cursor-pointer hover:underline"
                        >
                          #{tag}
                        </span>
                      ))
                    : post.hashtags.split(",").map((tag, i) => (
                        <span
                          key={i}
                          className="text-blue-600 font-medium cursor-pointer hover:underline"
                        >
                          #{tag.trim()}
                        </span>
                      ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
