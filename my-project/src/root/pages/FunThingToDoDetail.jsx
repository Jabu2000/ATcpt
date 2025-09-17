import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
  FaTrash,
} from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  saveAdventure,
  removeAdventure,
  getSavedAdventures,
} from "../../services/portfolioService";
import FTTDCategories from "../../sections/FunThingsToDo/FTTDCategories";
import Footer from "../../components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import { useDropzone } from "react-dropzone";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

/** ⭐ Star Rating Input Component */
const StarRatingInput = ({ value, onChange }) => {
  return (
    <div className="flex gap-1 text-[#FAA500] cursor-pointer">
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        return (
          <span
            key={i}
            onClick={() => onChange(starValue)}
            className="hover:scale-110 transition-transform"
          >
            {value >= starValue ? (
              <FaStar />
            ) : value >= starValue - 0.5 ? (
              <FaStarHalfAlt />
            ) : (
              <FaRegStar />
            )}
          </span>
        );
      })}
    </div>
  );
};

const FunThingToDoDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  // Comment state
    const [showCommentFormOverlay, setShowCommentFormOverlay] = useState(false);
    const [newComment, setNewComment] = useState({
      text: "",
      ratings: { food: 0, service: 0, vibes: 0, overall: 0 },
      images: [],
    });
  
    /** Dropzone for images */
    const { getRootProps, getInputProps } = useDropzone({
      accept: { "image/*": [] },
      onDrop: (acceptedFiles) => {
        setNewComment({
          ...newComment,
          images: [...newComment.images, ...acceptedFiles],
        });
      },
    });

  const loadActivity = async () => {
    try {
      const res = await fetch(`${API_URL}/api/activities/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      setActivity(data);
      setIsSaved(data.isSaved || false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load activity");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    loadActivity();
  }, [id]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // fetch activity details
        const res = await fetch(`${API_URL}/api/activities/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        setActivity(data);

        // check saved list
        const saved = await getSavedAdventures();
        const found = saved.find(
          (s) => s.type === "activity" && s.refId === data._id
        );
        setIsSaved(!!found);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load activity");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadData();
  }, [id]);

  const toggleSave = async () => {
    if (!activity) return;
    try {
      if (isSaved) {
        await removeAdventure("activity", activity._id);
        setIsSaved(false);
        toast.success("Removed from saved");
      } else {
        await saveAdventure("activity", activity._id, activity);
        setIsSaved(true);
        toast.success("Saved successfully");
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to update saved");
    }
  };

  // Submit new comment
    const submitComment = async () => {
      if (!newComment.text.trim())
        return toast.error("Comment text cannot be empty!");
  
      try {
        const formData = new FormData();
        formData.append("text", newComment.text);
        formData.append("ratings", JSON.stringify(newComment.ratings));
        newComment.images.forEach((img) => formData.append("images", img));
  
        const res = await fetch(
          `${API_URL}/api/activities/${activity._id}/comment`,
          {
            method: "POST",
            body: formData,
            credentials: "include", 
          }
        );
        
  
        const data = await res.json();
  
        if (res.ok) {
          // Add only the new comment
          setActivity((prev) => ({
            ...prev,
            comments: [data, ...(prev.comments || [])],
          }));
  
          setNewComment({
            text: "",
            ratings: { food: 0, service: 0, vibes: 0, overall: 0 },
            images: [],
          });
          setShowCommentFormOverlay(false);
          toast.success("Comment added ✅");
        } else {
          toast.error(data.error || "Failed to add comment 😢");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong ⚠️");
      }
    };
  
    // Delete comment
    const handleDeleteComment = async (commentId) => {
  // 1. Optimistically update UI
  const oldComments = activity.comments;
  setActivity((prev) => ({
    ...prev,
    comments: prev.comments.filter((c) => c._id !== commentId),
  }));

  try {
    const res = await fetch(
      `${API_URL}/api/activities/${activity._id}/comment/${commentId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    const data = await res.json();

    if (res.ok) {
      toast.success("Comment deleted ✅");
    } else {
      // Rollback if failed
      setActivity((prev) => ({ ...prev, comments: oldComments }));
      toast.error(data.error || "Failed to delete comment 😢");
    }
  } catch (err) {
    console.error(err);
    // Rollback if failed
    setActivity((prev) => ({ ...prev, comments: oldComments }));
    toast.error("Something went wrong ⚠️");
  }
};

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!activity) return <p className="text-center mt-10">Activity not found</p>;

  const rating = activity.rating || 0;

  return (
    <>
      <div className="w-full flex flex-col p-[50px] min-h-screen">
        <Link to="/activities" className="text-black text-[20px] mb-4 w-fit">
          <FaArrowLeft />
        </Link>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-10">
            <div className="w-full h-[40vh] justify-center flex flex-col px-4 gap-10">
              <h1 className="text-4xl lg:text-[80px] font-bold leading-[80px] w-[80%]">
                {activity.name}
              </h1>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-black text-[16px] font-semibold">
                    {activity.address}
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
              {activity.openStatus && (
                <p className="mt-2 font-medium text-green-600">
                  {activity.openStatus}
                </p>
              )}

              {activity.openingHours && (
                <div className="w-[60%] bg-[#FF0000] rounded-3xl px-[20px] pt-[40px] pb-[20px]">
                  <h2 className="text-white text-[34px] font-bold mb-2">
                    Hours
                  </h2>
                  <table className="w-full mt-6 border border-gray-200 rounded-lg overflow-hidden">
                    <tbody>
                      {Object.entries(activity.openingHours).map(
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
                {activity.about && (
                  <p className="mt-4 text-black font-medium">
                    {activity.about}
                  </p>
                )}
                {activity.website && (
                  <a
                    href={activity.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-blue-600 underline"
                  >
                    Visit Website
                  </a>
                )}
                {activity.phone && (
                  <p className="mt-2 text-black">☎ {activity.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Images + Map */}
          <div className="flex-1 flex flex-col gap-6">
            {activity.images?.length > 0 && (
              <div className="flex flex-col gap-4">
                {activity.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.startsWith("http") ? img : `${API_URL}${img}`}
                    alt={`${activity.name} ${idx + 1}`}
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
        {/* Comments Section */}
                <div className="mt-6 flex flex-col gap-4">
                  <h2 className="text-2xl font-bold">Reviews & Comments</h2>
                  <button
                    onClick={() => setShowCommentFormOverlay(true)}
                    className="px-6 py-3 bg-green-500 text-white rounded-2xl hover:bg-green-600 w-fit"
                  >
                    Add a Comment
                  </button>
        
                  {activity.comments?.length > 0 ? (
                    <div className="flex flex-col gap-4 mt-4">
                      {activity.comments.map((comment) => (
                        <div
                          key={comment._id}
                          className="flex flex-col gap-2 bg-white p-4 rounded-2xl shadow"
                        >
                          <div className="flex flex-row items-center gap-3">
                            <img
                              src={comment.user.profilePicture || "/default-avatar.png"}
                              alt={comment.user.username}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <p className="font-semibold">{comment.user.username}</p>
                            <button
                              onClick={() => handleDeleteComment(comment._id)}
                              className="ml-auto text-red-500 hover:text-red-700"
                            >
                              <FaTrash />
                            </button>
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
                              {comment.images.map((img, idx) => (
                                <img
                                  key={idx}
                                  src={
                                    img.startsWith("http") ? img : `${API_URL}${img}`
                                  }
                                  alt={`comment-${idx}`}
                                  className="w-32 h-32 object-cover rounded-xl"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4">No comments yet. Be the first to comment!</p>
                  )}
                </div>
        
                {/* Comment Form Overlay */}
                <AnimatePresence>
                  {showCommentFormOverlay && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-20 overflow-auto"
                      onClick={(e) =>
                        e.target === e.currentTarget && setShowCommentFormOverlay(false)
                      }
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
                </AnimatePresence>
      </div>
      <div className="w-100% h-[300px] bg-[#AEFF53] mx-[50px] flex justify-center items-center rounded-2xl">
        <img />
      </div>
      <FTTDCategories />
      <Footer />
    </>
  );
};

export default FunThingToDoDetail;
