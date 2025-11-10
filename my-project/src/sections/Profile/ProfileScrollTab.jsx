import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, X, ChevronLeft, ChevronRight } from "lucide-react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL ||"http://localhost:4000";

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
          <p className="text-[12px] md:text-sm text-[#FF0000] capitalize">
            {item.type}
          </p>

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

export const GalleryPost = ({
  post,
  onDelete,
  activePostId,
  setActivePostId,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  // Delete handler
  const handleDelete = (id) => {
    onDelete(id);
    setMenuOpen(false);
    setActivePostId(null);
    setDeleteIndex(null);
  };

  // Share handler
  const handleShare = () => {
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
  };

  // Image Viewer Controls
  const openViewer = (index) => {
    setCurrentImageIndex(index);
    setViewerOpen(true);
  };

  const closeViewer = () => {
    setViewerOpen(false);
  };

  const showNext = () => {
    setCurrentImageIndex((prev) =>
      prev === post.images.length - 1 ? 0 : prev + 1
    );
  };

  const showPrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? post.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative group overflow-hidden rounded-md shadow-md">
      {/* Post Image */}
      {Array.isArray(post.images) && post.images.length > 0 ? (
        post.images.map((imgUrl, idx) => (
          <img
            key={idx}
            src={
              imgUrl.startsWith("http")
                ? imgUrl
                : `${API_URL}/uploads/posts/${imgUrl}`
            }
            alt={post.content || "Post image"}
            className="w-full xl:h-[420px] h-[100%] object-cover rounded-md cursor-pointer post-image"
            onClick={() => openViewer(idx)}
          />
        ))
      ) : (
        <div className="bg-gray-100 w-full h-64 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}

      {/* Content Overlay */}
      <div
        className={`absolute bottom-0 left-0 w-full 
          bg-black/60 text-white px-4 py-2 rounded-b-md
          transform transition-all duration-300
          ${
            isActive
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0 md:translate-y-0 md:opacity-0 md:group-hover:opacity-100"
          }`}
      >
        <p className="text-xs sm:text-sm">{post.content}</p>
      </div>

      {/* Dropdown Menu */}
      <div className="absolute top-2 right-2" ref={menuRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
            setActivePostId(post._id);
          }}
          className={`bg-white shadow p-1 rounded-full transition ${
            isActive ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"
          }`}
        >
          <MoreVertical className="w-5 h-5 text-gray-700" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg z-10">
            <button
              onClick={() => setDeleteIndex(post._id)}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Delete
            </button>
            <button
              onClick={handleShare}
              className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
            >
              Share
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteIndex !== null && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteIndex(null)}
            />

            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="bg-white rounded-xl p-6 shadow-lg w-80 max-w-full text-center">
                <h3 className="text-lg font-bold mb-4">Delete</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Are you sure you want to delete this image?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setDeleteIndex(null)}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteIndex)}
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Image Viewer Modal */}
      <AnimatePresence>
        {viewerOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/90 z-[999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeViewer}
            />

            {/* Image Container */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-[1000] p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="relative max-w-5xl w-full flex items-center justify-center">
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
                  onClick={closeViewer}
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Prev Button */}
                {post.images.length > 1 && (
                  <button
                    className="absolute left-2 md:left-6 text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      showPrev();
                    }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                )}

                {/* Image */}
                <motion.img
                  key={currentImageIndex}
                  src={
                    post.images[currentImageIndex].startsWith("http")
                      ? post.images[currentImageIndex]
                      : `${API_URL}/uploads/posts/${post.images[currentImageIndex]}`
                  }
                  alt="Full Image"
                  className="max-h-[90vh] max-w-full object-contain rounded-lg"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                />

                {/* Next Button */}
                {post.images.length > 1 && (
                  <button
                    className="absolute right-2 md:right-6 text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      showNext();
                    }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};