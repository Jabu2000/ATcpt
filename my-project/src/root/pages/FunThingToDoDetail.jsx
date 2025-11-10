import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
  FaTimes,
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
import ActivitiesMap from "../../sections/FunThingsToDo/ActivitiesMap";

const API_URL = import.meta.env.VITE_API_URL || "https://adventuretimecpt.onrender.com";

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

const ActivitiesImages = ({ activity }) => {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const images = activity?.images || [];

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (!images.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  // Handle keyboard navigation in modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images.length) return null;

  return (
    <>
      {/* Slideshow */}
      <div
        className="relative w-full h-[60vh] overflow-hidden rounded-3xl cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img.startsWith("http") ? img : `${API_URL}${img}`}
            alt={`${activity.name} ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover rounded-3xl transition-opacity duration-700 ${
              idx === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full transition-all ${
                idx === currentIndex ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Modal Lightbox */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-5 right-6 text-white text-3xl hover:scale-110 transition-transform"
          >
            <FaTimes />
          </button>

          {/* Image */}
          <img
            src={
              images[currentIndex].startsWith("http")
                ? images[currentIndex]
                : `${API_URL}${images[currentIndex]}`
            }
            alt={`Slide ${currentIndex + 1}`}
            className="max-w-[90%] max-h-[85vh] object-contain rounded-2xl"
          />

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-8 text-white text-4xl hover:scale-125 transition-transform"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-8 text-white text-4xl hover:scale-125 transition-transform"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </>
  );
};

const FunThingToDoDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const images = [
    "/activitiespost1.png",
    "/activitiespost2.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade-out
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setFade(true); // fade-in
      }, 500); // fade duration (must match CSS transition)
    }, 4000); // time per image

    return () => clearInterval(interval);
  }, [images.length]);

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
      <div className="w-full flex flex-col px-6 lg:px-[50px] pt-8 pb-[50px] min-h-screen">
        <Link to="/activities" className="text-black text-[20px] mb-4 w-fit">
          <FaArrowLeft />
        </Link>
        <div className="flex flex-col lg:flex-row md:mt-[40px] mt-0 gap-6">
          <div className="flex-1 flex flex-col gap-10">
            <div className="w-full h-[40vh] justify-center flex flex-col gap-10">
              <h1 className="text-[40px] sm:text-[50px] lg:text-[70px] font-bold leading-tight sm:leading-[60px] lg:leading-[80px] w-full sm:w-[90%] lg:w-[80%]">
                {activity.name}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-black text-sm sm:text-base font-semibold">
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
                  className={`text-[14px] py-2 mt-2 px-6 rounded-2xl ${
                    isSaved
                      ? "bg-green-500 hover:bg-[#FF0000] text-white"
                      : "bg-[#FF0000] hover:bg-green-500 text-white"
                  }`}
                >
                  {isSaved ? "Saved ✓ (click to remove)" : "Save"}
                </button>
              </div>
            </div>

            {/* Open Hours / About */}
            <div className="flex flex-col lg:flex-row gap-6 mt-6 lg:mt-0">
              {activity.openStatus && (
                <p className="mt-2 font-medium text-green-600">
                  {activity.openStatus}
                </p>
              )}

              {activity.openingHours && (
                <div className="w-full lg:w-[60%] bg-[#FF0000] rounded-3xl px-[20px] pt-[40px] pb-[20px]">
                  <h2 className="text-white md:text-[35px] text-[25px] font-bold mb-2">
                    Hours
                  </h2>
                  <table className="w-full mt-6 border border-gray-200 rounded-lg overflow-hidden">
                    <tbody>
                      {Object.entries(activity.openingHours).map(
                        ([day, hours]) => (
                          <tr
                            key={day}
                            className="text-white lg:text-[11px] text-[16px]"
                          >
                            <td className="py-2 font-medium capitalize">
                              {day}
                            </td>
                            <td className="py-2">
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
                <h2 className="text-black md:text-[35px] text-[25px] font-bold">
                  About
                </h2>
                {activity.about && (
                  <p className="mt-4 text-black text-[14px] font-medium">
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
                  <p className="mt-2 text-[14px] font-semibold text-black">
                    ☎ {activity.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Images + Map */}
          <div className="flex-1 flex flex-col gap-6">
            <ActivitiesImages activity={activity} />

            <div className="w-full h-[50vh] z-10 bg-gray-200 rounded-3xl">
              <ActivitiesMap address={activity.address} name={activity.name} />
            </div>
          </div>
        </div>
        {/* Comments Section */}
        <div className="mt-[100px] flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Reviews & Comments</h2>
          <button
            onClick={() => setShowCommentFormOverlay(true)}
            className="px-6 py-2 bg-green-500 text-white text-[14px] rounded-2xl hover:bg-green-600 w-fit"
          >
            Write A Review
          </button>

          {activity.comments?.length > 0 ? (
            <div className="flex flex-wrap md:flex-col-2 mt-[50px] gap-[40px]">
              {activity.comments.map((comment) => (
                <div
                  key={comment._id}
                  className="w-full lg:w-[48%] flex flex-col gap-2"
                >
                  <div className="flex flex-row items-center gap-3">
                    <img
                      src={comment.user.profilePicture || "/default-avatar.png"}
                      alt={comment.user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p className="w-full md:w-[60%] font-semibold">
                      {comment.user.username}
                    </p>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <div className="flex flex-row gap-2 text-[#FAA500] mt-2 flex-wrap">
                    {["overall"].map((key) => {
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

                  <p className="w-[88%] mt-2">{comment.text}</p>

                  {comment.images?.length > 0 && (
                    <div className="flex flex-wrap md:flex-row gap-2 overflow-hidden mt-2">
                      {comment.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={
                            img.startsWith("http") ? img : `${API_URL}${img}`
                          }
                          alt={`comment-${idx}`}
                          className="w-[140px] h-32 object-cover rounded-xl"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex flex-row gap-2 text-[#FAA500] mt-2 flex-wrap">
                    {["food", "service", "vibes"].map((key) => {
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
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center overflow-auto"
              onClick={(e) =>
                e.target === e.currentTarget && setShowCommentFormOverlay(false)
              }
            >
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                className="bg-white rounded-3xl max-w-4xl p-10 flex flex-col  relative"
              >
                <button
                  onClick={() => setShowCommentFormOverlay(false)}
                  className="absolute top-4 right-4 text-[#FF0000] hover:text-green-600 md:text-2xl text-[16px] font-bold"
                >
                  &times;
                </button>

                <h2 className="md:text-2xl text-[16px] font-bold">
                  Add A Review
                </h2>

                <div className="md:w-[400px] flex flex-col md:gap-4 gap-2 pt-4 ">
                  <div className="grid grid-cols-2 gap-6">
                    {["food", "service", "vibes", "overall"].map((key) => (
                      <div key={key} className="flex flex-col ">
                        <label className="capitalize font-semibold md:text-[14px] text-[10px]">
                          {key}
                        </label>
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
                  <div className="pt-4">
                    <label className="md:text-[16px] text-[12px] font-semibold">
                      Write A Review
                    </label>
                    <textarea
                      className="p-3 rounded-lg border-2 border-black w-full md:text-[14px] text-[10px] md:h-[100px] h-[60px]"
                      placeholder="Write your comment..."
                      value={newComment.text}
                      onChange={(e) =>
                        setNewComment({ ...newComment, text: e.target.value })
                      }
                    />
                  </div>

                  <div className="">
                    <label className="md:text-[16px text-[10px] font-semibold">
                      Add Images
                    </label>
                    <div
                      {...getRootProps()}
                      className="p-6 border-2 border-black rounded-lg text-center cursor-pointer hover:border-gray-600"
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
                        <div className="capitalize">
                          <p className="md:text-[12px] text-[10px]">
                            click to add image
                          </p>
                          <p className="md:text-[10px] text-[8px]">
                            Or Drag & drop{" "}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={submitComment}
                    className="px-6 py-2 bg-green-500 text-white text-[14px] rounded-2xl hover:bg-[#FF0000] w-full"
                  >
                    Submit Comment
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="w-full md:h-full h-[600px] px-6 lg:px-[50px] mt-[80px] flex justify-center items-center rounded-2xl">
        <img
          src={images[currentIndex]}
          alt="banner"
          className={`w-full h-full md:object-cover rounded-2xl transition-opacity duration-500 md:hidden flex ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />

        <img
          src="/activitiespost1.png"
          alt="banner"
          className="w-full h-full object-cover rounded-2xl md:flex hidden"
        />
      </div>
      <FTTDCategories />
      <Footer />
    </>
  );
};

export default FunThingToDoDetail;
