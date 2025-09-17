import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
// import StarRatingInput from "../../components/StarRatingInput";
// import { useDropzone } from "react-dropzone";
// import { motion, AnimatePresence } from "framer-motion";
// import Footer from "../../components/Footer";
// import RestaurantCategories from "../../sections/Restaurant/RestaurantCategories";
import {
  removeAdventure,
  saveAdventure,
  getSavedAdventures,
} from "../../services/portfolioService";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  // const [savedIds, setSavedIds] = useState([]);
  // const [showCommentFormOverlay, setShowCommentFormOverlay] = useState(false);
  // const [newComment, setNewComment] = useState({
  //   text: "",
  //   images: [],
  //   ratings: { food: 0, service: 0, vibes: 0, overall: 0 },
  // });

  // Load restaurant with comments
  const loadRestaurant = async () => {
    try {
      const res = await fetch(`${API_URL}/api/restaurants/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setRestaurant(data);
        setIsSaved(data.isSaved || false);
      } else {
        toast.error(data.error || "Failed to load restaurant");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong ⚠️");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (!id) return;
  (async () => {
    await loadRestaurant();
    try {
      const saved = await getSavedAdventures();
      setIsSaved(saved.some((s) => s.refId === id && s.type === "restaurant"));
    } catch (e) {
      console.error(e);
    }
  })();
}, [id]);

  const toggleSave = async () => {
  try {
    if (isSaved) {
      await removeAdventure("restaurant", restaurant._id);
      setIsSaved(false);
      toast.success("Removed from saved ❌");
    } else {
      await saveAdventure("restaurant", restaurant._id);
      setIsSaved(true);
      toast.success("Restaurant saved ✅");
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to update saved status ⚠️");
  }
};

  // Drag & drop for comment images
  // const { getRootProps, getInputProps } = useDropzone({
  //   accept: { "image/*": [] },
  //   onDrop: (acceptedFiles) => {
  //     setNewComment((prev) => ({
  //       ...prev,
  //       images: [...prev.images, ...acceptedFiles],
  //     }));
  //   },
  // });

  // Submit new comment
  // const submitComment = async () => {
  //   if (!newComment.text.trim()) {
  //     return toast.error("Comment text cannot be empty!");
  //   }

  //   try {
  //     const formData = new FormData();
  //     formData.append("text", newComment.text);

  //     // Convert ratings object to JSON string
  //     formData.append("ratings", JSON.stringify(newComment.ratings));

  //     // Append images
  //     newComment.images.forEach((img) => formData.append("images", img));

  //     const res = await fetch(
  //       `${API_URL}/api/restaurants/${restaurant._id}/comments`,
  //       {
  //         method: "POST",
  //         body: formData,
  //         credentials: "include",
  //       }
  //     );

  //     const data = await res.json();

  //     if (res.ok) {
  //       // Add new comment to restaurant state
  //       setRestaurant((prev) => ({
  //         ...prev,
  //         comments: [data, ...(prev.comments || [])],
  //       }));

  //       // Reset form
  //       setNewComment({
  //         text: "",
  //         images: [],
  //         ratings: { food: 0, service: 0, vibes: 0, overall: 0 },
  //       });
  //       setShowCommentFormOverlay(false);
  //       toast.success("Comment added ✅");
  //     } else {
  //       toast.error(data.error || "Failed to add comment 😢");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Something went wrong ⚠️");
  //   }
  // };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!restaurant)
    return <p className="text-center mt-10">Restaurant not found</p>;

  const rating = restaurant.rating || 0;

  return (
    <>
      <div className="w-full flex flex-col p-[50px]  min-h-screen">
        <Link to="/restaurants" className="text-black text-[20px] mb-4 w-fit">
          <FaArrowLeft />
        </Link>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-10">
            {/* Restaurant Info */}
            <div className="w-full h-[40vh] justify-center flex flex-col px-4 gap-10">
              <h1 className="text-4xl lg:text-[80px] font-bold leading-[80px] w-[80%]">
                {restaurant.name}
              </h1>

              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-black text-[16px] font-semibold">
                    {restaurant.address}
                  </p>
                  <p className="text-black text-[16px] font-semibold">
                    {restaurant.cuisine}
                  </p>

                  <div className="flex items-center gap-1 text-[#FAA500]">
                    {Array.from({ length: 5 }, (_, i) => {
                      const starValue = i + 1;
                      if (rating >= starValue) return <FaStar key={i} />;
                      if (rating >= starValue - 0.5)
                        return <FaStarHalfAlt key={i} />;
                      return <FaRegStar key={i} />;
                    })}
                    <span className="ml-2 text-black">{rating.toFixed(1)}</span>
                  </div>
                </div>

                <button
                  onClick={toggleSave}
                  className={`text-[16px] font-semibold h-10 px-6 rounded-2xl ${
                    isSaved
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  {isSaved ? "Saved ✓ (click to remove)" : "Save"}
                </button>
              </div>
            </div>

            {/* Open Hours / About */}
            <div className="flex flex-row gap-6">
              {restaurant.openStatus && (
                <p className="mt-2 font-medium text-green-600">
                  {restaurant.openStatus}
                </p>
              )}

              {restaurant.openingHours && (
                <div className="w-[60%] bg-[#FF0000] rounded-3xl px-[20px] pt-[40px] pb-[20px]">
                  <h2 className="text-white text-[34px] font-bold mb-2">
                    Hours
                  </h2>
                  <table className="w-full mt-6 border border-gray-200 rounded-lg overflow-hidden">
                    <tbody>
                      {Object.entries(restaurant.openingHours).map(
                        ([day, hours]) => (
                          <tr
                            key={day}
                            className="border-t border-gray-200 text-white"
                          >
                            <td className="py-2 px-3 font-medium capitalize">
                              {day}
                            </td>
                            <td className="py-2 px-3">
                              {hours.open && hours.close
                                ? `${hours.open} - ${hours.close}`
                                : "Closed"}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="w-full flex flex-col bg-[#AEFF53] rounded-3xl px-[20px] pt-[40px] pb-[20px] gap-4">
                <h2 className="text-black text-[34px] font-bold mb-2">About</h2>
                {restaurant.about && (
                  <p className="mt-4 text-black font-medium">
                    {restaurant.about}
                  </p>
                )}
                {restaurant.website && (
                  <a
                    href={restaurant.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-blue-600 underline"
                  >
                    Visit Website
                  </a>
                )}
                {restaurant.phone && (
                  <p className="mt-2 text-black">☎ {restaurant.phone}</p>
                )}
              </div>
            </div>

            {/* Comments Section
            <div className="mt-6 flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Reviews & Comments</h2>
              <button
                onClick={() => setShowCommentFormOverlay(true)}
                className="px-6 py-3 bg-green-500 text-white rounded-2xl hover:bg-green-600 w-fit"
              >
                Add a Comment
              </button>

              {restaurant.comments?.length > 0 ? (
                <div className="flex flex-col gap-4 mt-4">
                  {restaurant.comments.map((comment, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col gap-2 bg-white p-4 rounded-2xl shadow"
                    >
                      <div className="flex flex-row items-center gap-3">
                        <img
                          src={
                            comment.user.profilePicture || "/default-avatar.png"
                          }
                          alt={comment.user.username}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <p className="font-semibold">{comment.user.username}</p>
                      </div>

                      <p className="mt-2">{comment.text}</p>

                      <div className="flex flex-row gap-2 text-[#FAA500] mt-2 flex-wrap">
                        {["food", "service", "vibes", "overall"].map((key) => {
                          const r = comment.ratings[key] || 0;
                          return (
                            <div key={key} className="flex items-center gap-1">
                              <span className="font-semibold">{key}:</span>
                              {Array.from({ length: 5 }, (_, i) => {
                                const starValue = i + 1;
                                if (r >= starValue) return <FaStar key={i} />;
                                if (r >= starValue - 0.5)
                                  return <FaStarHalfAlt key={i} />;
                                return <FaRegStar key={i} />;
                              })}
                            </div>
                          );
                        })}
                      </div>

                      {comment.images?.length > 0 && (
                        <div className="flex flex-row gap-2 overflow-x-auto mt-2">
                          {comment.images.map((img, idx2) => (
                            <img
                              key={idx2}
                              src={
                                img.startsWith("http")
                                  ? img
                                  : `${API_URL}${img}`
                              }
                              alt={`comment-${idx2}`}
                              className="w-32 h-32 object-cover rounded-xl"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div> */}
          </div>

          {/* Right Column - Images + Map */}
          <div className="flex-1 flex flex-col gap-6">
            {restaurant.images?.length > 0 && (
              <div className="flex flex-col gap-4">
                {restaurant.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.startsWith("http") ? img : `${API_URL}${img}`}
                    alt={`${restaurant.name} ${idx + 1}`}
                    className="w-full max-h-[600px] object-cover rounded-3xl"
                  />
                ))}
              </div>
            )}
            <div className="w-full h-[23vh] bg-gray-200 flex items-center justify-center rounded-3xl">
              Map Placeholder
            </div>
          </div>
        </div>

        {/* Comment Form Overlay */}
        {/* <AnimatePresence>
          {showCommentFormOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-20 overflow-auto"
              onClick={(e) => {
                if (e.target === e.currentTarget)
                  setShowCommentFormOverlay(false);
              }}
            >
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                className="bg-white rounded-3xl w-[90%] max-w-4xl p-6 flex flex-col gap-6 relative"
              >
                <button
                  onClick={() => setShowCommentFormOverlay(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
                >
                  &times;
                </button>

                <h2 className="text-3xl font-bold">Add a Comment</h2>

                <div className="flex flex-col gap-4 bg-gray-100 p-6 rounded-2xl mt-4">
                  <textarea
                    className="p-3 rounded-lg border border-gray-300 w-full"
                    placeholder="Write your comment..."
                    value={newComment.text}
                    onChange={(e) =>
                      setNewComment({ ...newComment, text: e.target.value })
                    }
                  />

                  <div className="flex flex-row gap-6 mt-2 flex-wrap">
                    {["food", "service", "vibes", "overall"].map((key) => (
                      <div key={key} className="flex flex-col items-center">
                        <label className="capitalize font-medium">{key}</label>
                        <StarRatingInput
                          value={newComment.ratings[key]}
                          onChange={(val) =>
                            setNewComment({
                              ...newComment,
                              ratings: { ...newComment.ratings, [key]: val },
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div
                    {...getRootProps()}
                    className="mt-4 p-6 border-2 border-dashed border-gray-400 rounded-xl text-center cursor-pointer hover:border-gray-600"
                  >
                    <input {...getInputProps()} />
                    {newComment.images.length > 0 ? (
                      <div className="flex flex-wrap gap-2 justify-center">
                        {newComment.images.map((file, idx) => (
                          <img
                            key={idx}
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    ) : (
                      <p>Drag & drop images here, or click to select files</p>
                    )}
                  </div>

                  <button
                    onClick={submitComment}
                    className="px-6 py-3 bg-green-500 text-white rounded-2xl hover:bg-green-600 w-fit"
                  >
                    Submit Comment
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence> */}
      </div>
      {/* <div className="w-100% h-[300px] bg-[#AEFF53] mx-[50px] flex justify-center items-center rounded-2xl">
        <img />
      </div>
      <RestaurantCategories />
      <Footer /> */}
    </>
  );
};

export default RestaurantDetail;
