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

const AccommodationDetail = () => {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState(null);
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

  const loadAccommodation = async () => {
    try {
      const res = await fetch(`${API_URL}/api/accommodations/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      setAccommodation(data);
      setIsSaved(data.isSaved || false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load accommodation");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    loadAccommodation();
  }, [id]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/accommodations/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        setAccommodation(data);

        const saved = await getSavedAdventures();
        const found = saved.find(
          (s) => s.type === "accommodation" && s.refId === data._id
        );
        setIsSaved(!!found);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load accommodation");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadData();
  }, [id]);

  const toggleSave = async () => {
    if (!accommodation) return;
    try {
      if (isSaved) {
        await removeAdventure("accommodation", accommodation._id);
        setIsSaved(false);
        toast.success("Removed from saved");
      } else {
        await saveAdventure("accommodation", accommodation._id, accommodation);
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
        `${API_URL}/api/accommodations/${accommodation._id}/comment`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {
        // Add only the new comment
        setAccommodation((prev) => ({
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
    try {
      const res = await fetch(
        `${API_URL}/api/accommodations/${accommodation._id}/comment/${commentId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();

      if (res.ok) {
        setAccommodation((prev) => ({
          ...prev,
          comments: prev.comments.filter((c) => c._id !== commentId),
        }));
        toast.success("Comment deleted");
      } else {
        toast.error(data.error || "Failed to delete comment");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong ⚠️");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!accommodation)
    return <p className="text-center mt-10">Accommodation not found</p>;

  const rating = accommodation.rating || 0;

  return (
    <>
      <div className="w-full flex flex-col px-6 lg:px-[50px] pt-8 pb-[50px] min-h-screen">
        <Link to="/accommodation" className="text-black text-[20px] mb-4 w-fit">
          <FaArrowLeft />
        </Link>
        <div className="flex flex-col lg:flex-row md:mt-[50px] mt-0 gap-6">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-10">
            <div className="w-full h-[40vh] justify-center flex flex-col gap-10">
              <h1 className="text-[40px] sm:text-[50px] lg:text-[80px] font-bold leading-tight sm:leading-[60px] lg:leading-[80px] w-full sm:w-[90%] lg:w-[80%]">
                {accommodation.name}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-black text-sm sm:text-base font-semibold">
                    {accommodation.address}
                  </p>
                  <p className="text-black text-sm sm:text-base font-semibold">
                    {accommodation.cuisine}
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
                  className={`text-[16px] font-semibold h-10 mt-2 px-6 rounded-2xl ${
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
            <div className="flex flex-col lg:flex-row gap-6 mt-6 lg:mt-0">
              {accommodation.openStatus && (
                <p className="mt-2 font-medium text-green-600">
                  {accommodation.openStatus}
                </p>
              )}

              {accommodation.openingHours && (
                <div className="w-full lg:w-[60%] bg-[#FF0000] rounded-3xl px-[20px] pt-[40px] pb-[20px]">
                  <h2 className="text-white md:text-[35px] text-[25px] font-bold mb-2">
                    Hours
                  </h2>
                  <table className="w-full mt-6 border border-gray-200 rounded-lg overflow-hidden">
                    <tbody>
                      {Object.entries(accommodation.openingHours).map(
                        ([day, hours]) => (
                          <tr
                            key={day}
                            className="text-white lg:text-[12px] text-[16px]"
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
                {accommodation.about && (
                  <p className="mt-4 text-black font-medium">
                    {accommodation.about}
                  </p>
                )}
                {accommodation.website && (
                  <a
                    href={accommodation.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-blue-600 underline"
                  >
                    Visit Website
                  </a>
                )}
                {accommodation.phone && (
                  <p className="mt-2 text-black">☎ {accommodation.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Images + Map */}
          <div className="flex-1 flex flex-col gap-6">
            {accommodation.images?.length > 0 && (
              <div className="flex flex-col gap-4">
                {accommodation.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.startsWith("http") ? img : `${API_URL}${img}`}
                    alt={`${accommodation.name} ${idx + 1}`}
                    className="w-full max-h-[600px] object-cover rounded-3xl"
                  />
                ))}
              </div>
            )}
            <div className="w-full h-[23vh] bg-gray-200 flex items-center justify-center rounded-3xl">
              Map Accommodationholder
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
            Add a Comment
          </button>

          {accommodation.comments?.length > 0 ? (
            <div className="flex flex-wrap md:flex-col-2 mt-[50px] gap-[40px]">
              {accommodation.comments.map((comment) => (
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

                  <p className="w-[80%] mt-2">{comment.text}</p>

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
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 md:text-2xl text-[16px] font-bold"
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
                    className="px-6 py-2 bg-[#AEFF53] md:text-[14px] text-[10px] text-black hover:text-white font-semibold rounded-2xl hover:bg-[#FF0000] w-full"
                  >
                    Submit Comment
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="h-[300px] bg-[#AEFF53] mx-[50px] flex justify-center items-center rounded-2xl">
        <img />
      </div>
      <Footer />
    </>
  );
};

export default AccommodationDetail;
