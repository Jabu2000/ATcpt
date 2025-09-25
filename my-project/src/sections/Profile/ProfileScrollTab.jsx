import React, { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const API_URL = "http://localhost:4000";

export const SavedAdventureItem = ({ item, onRemove }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const imageSrc = item.images?.[0]
    ? item.images[0].startsWith("http")
      ? item.images[0]
      : `${API_URL}${item.images[0]}`
    : item.details?.images?.[0]
    ? item.details.images[0].startsWith("http")
      ? item.details.images[0]
      : `${API_URL}${item.details.images[0]}`
    : "/placeholder.png";

  const rating = item.rating ?? item.details?.rating;

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <li className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-4 rounded-lg relative overflow-hidden">
      {/* Image */}
      <img
        src={imageSrc}
        alt={item.name || item.details?.name || "Adventure"}
        className="w-full sm:w-48 h-28 sm:h-28 object-cover rounded-lg flex-shrink-0"
      />

      {/* Info */}
      <div className="flex flex-row gap-6">
        <div className="flex flex-col flex-1 justify-center">
          <h3 className="font-semibold text-[16px] sm:text-xl">
            {item.name || item.details?.name}
          </h3>
          <p className="text-[12px] md:text-sm text-[#FF0000] capitalize">{item.type}</p>

          {/* ⭐ Rating Stars */}
          {typeof rating === "number" && (
            <div className="flex items-center gap-1 text-[#FAA500] mt-1 flex-wrap">
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

        {/* Dropdown Menu */}
        <div className="relative  self-start sm:self-center" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="bg-white shadow p-2 rounded-full hover:bg-gray-100"
          >
            <MoreVertical className="w-5 h-5 text-gray-700" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg z-10">
              <button
                onClick={() => {
                  onRemove(item._id, item.type, item.refId);
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: item.name || item.details?.name,
                      text: "Check out this adventure!",
                      url: window.location.href,
                    });
                  } else {
                    alert("Sharing not supported in this browser.");
                  }
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
              >
                Share
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export const GalleryPost = ({ post, onDelete, activePostId, setActivePostId }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const isActive = activePostId === post._id;

  // Close menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !e.target.closest(".post-image")
      ) {
        setMenuOpen(false);
        setActivePostId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setActivePostId]);

  return (
    <div className="relative group overflow-hidden rounded-md shadow-md">
      {/* Post image */}
      {post.image && (
        <img
          src={post.image.startsWith("http") ? post.image : `${API_URL}${post.image}`}
          alt={post.title}
          className="w-full xl:h-[420px] h-[100%] object-cover rounded-md cursor-pointer post-image"
          onClick={() =>
            setActivePostId(isActive ? null : post._id) // toggle only this
          }
        />
      )}

      {/* Content Overlay */}
      <div
        className={`
          absolute bottom-0 left-0 w-full 
          bg-black/60 text-white px-4 py-2 rounded-b-md
          transform transition-all duration-300
          ${isActive ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 md:translate-y-0 md:opacity-0 md:group-hover:opacity-100"}
        `}
      >
        <p className="text-xs sm:text-sm">{post.content}</p>
      </div>

      {/* Dropdown trigger & menu */}
      <div className="absolute top-2 right-2" ref={menuRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
            setActivePostId(post._id); // ensure overlay opens with menu
          }}
          className={`
            bg-white shadow p-1 rounded-full transition
            ${isActive ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"}
          `}
        >
          <MoreVertical className="w-5 h-5 text-gray-700" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg z-10">
            <button
              onClick={() => {
                onDelete(post._id);
                setMenuOpen(false);
                setActivePostId(null);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Delete
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: post.title,
                    text: post.content,
                    url: window.location.href,
                  });
                } else {
                  alert("Sharing not supported in this browser.");
                }
                setMenuOpen(false);
                setActivePostId(null);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
            >
              Share
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
