import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const API_URL = "http://localhost:4000";

export const SavedAdventureItem = ({ item, onRemove }) => {
  const imageSrc = item.images?.[0]
    ? item.images[0].startsWith("http")
      ? item.images[0]
      : `${API_URL}${item.images[0]}`
    : item.details?.images?.[0]
    ? item.details.images[0].startsWith("http")
      ? item.details.images[0]
      : `${API_URL}${item.details.images[0]}`
    : "/placeholder.png";

  const rating = item.rating ?? item.details?.rating; // ✅ fallback

  return (
    <li className="flex flex-row items-center gap-6 py-4 rounded-lg">
      <img
        src={imageSrc}
        alt={item.name || item.details?.name || "Adventure"}
        className="w-48 h-28 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h3 className="font-semibold">{item.name || item.details?.name}</h3>
        <p className="text-sm text-gray-500 capitalize">{item.type}</p>

        {/* ⭐ Rating Stars */}
        {typeof rating === "number" && (
          <div className="flex items-center gap-1 text-[#FAA500] mt-1">
            {Array.from({ length: 5 }, (_, i) => {
              const starValue = i + 1;
              if (rating >= starValue) return <FaStar key={i} />;
              if (rating >= starValue - 0.5) return <FaStarHalfAlt key={i} />;
              return <FaRegStar key={i} />;
            })}
            <span className="ml-2 text-gray-700">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      <button
        onClick={() => onRemove(item._id, item.type, item.refId)}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
      >
        Remove
      </button>
    </li>
  );
};

export const GalleryPost = ({ post, onDelete }) => {
  return (
    <div className="relative group rounded-lg  overflow-hidden">
      {post.image && (
        <img
          src={
            post.image.startsWith("http")
              ? post.image
              : `${API_URL}${post.image}`
          }
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="font-semibold">{post.title}</h3>
        <p className="text-gray-600 text-sm">{post.content}</p>
      </div>
      <button
        onClick={() => onDelete(post._id)}
        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
      >
        Delete
      </button>
    </div>
  );
};
