import React, { useEffect, useState } from "react";
import { getPosts } from "../../services/api";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "../../auth/AuthContext"; // adjust path

const HomeCategories = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await getPosts();
        setPosts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [user]);

  return (
    <div className="w-full flex flex-col items-center pt-[30px]">
      <h2 className="text-[40px] text-black sm:text-[50px] font-bold mb-8 lg:flex hidden">
        Adventure Time
      </h2>

      <div className="grid md:grid-cols-1 gap-8 lg:mt-1 mt-[20px] w-full justify-center max-w-2xl">
        {posts.map((post) => {
          // ✅ Pick correct avatar
          const avatar =
            post.userId?.profilePicture ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              post.userId?.username || "User"
            )}`;

          return (
            <div key={post._id} className="flex flex-col items-center rounded-xl px-4 md-px-0">
              {/* Post header */}
              <div className="md:w-[70%] w-full flex items-center gap-3 py-4">
                <img
                  src={avatar}
                  alt={post.userId?.username || "User"}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-[18px] font-semibold text-black">
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

              {/* Post image */}
              <div className="md:w-[70%] w-full rounded-2xl flex justify-center items-center">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.content}
                    className="w-full rounded-3xl object-cover"
                  />
                )}
              </div>

              {/* Post content */}
              <div className="md:w-[70%] w-full py-2 gap-2 flex flex-col">
                <p className="text-black text-[15px] font-medium">
                  {post.content}
                </p>
                {post.hashtags && (
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(post.hashtags)
                      ? post.hashtags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[#FF0000] text-[14px] font-light cursor-pointer hover:underline"
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

              <div className="md:w-[70%] w-full h-[1px] mt-6 bg-[#AEFF53]" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeCategories;