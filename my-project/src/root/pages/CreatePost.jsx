import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import { createPost } from "../../services/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { getCroppedImg } from "../../lib/cropImage";
import TopNav from "../../components/TopNav";
import BottomNav from "../../components/BottomNav";
import LeftSidebar from "../../components/LeftSidebar";

const CreatePost = ({ currentUser, onPostCreated }) => {
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cropping states
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Carousel index
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  // Dropzone handler
  const onDrop = (acceptedFiles) => {
    const previews = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setImages((prev) => [...prev, ...previews]);
    setCurrentIndex(images.length); // move carousel to last uploaded
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: true,
    onDrop,
  });

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const applyCrop = async () => {
    try {
      const croppedImg = await getCroppedImg(
        selectedImage.preview,
        croppedAreaPixels,
        zoom
      );
      const croppedFile = new File(
        [croppedImg],
        selectedImage.name || "cropped.jpeg",
        { type: "image/jpeg" }
      );

      setImages((prev) =>
        prev.map((img) =>
          img === selectedImage
            ? Object.assign(croppedFile, {
                preview: URL.createObjectURL(croppedFile),
              })
            : img
        )
      );

      setCropModalOpen(false);
      setSelectedImage(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to crop image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return toast.error("Description cannot be empty");
    if (images.length === 0)
      return toast.error("Please upload at least one image");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("content", content);
      if (hashtags.trim()) formData.append("hashtags", hashtags);
      images.forEach((img) => formData.append("images", img));

      const data = await createPost(formData);

      // Reset form
      setContent("");
      setHashtags("");
      setImages([]);

      if (onPostCreated) onPostCreated(data);

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="hidden lg:block">
        <LeftSidebar />
      </div>
      <TopNav />
      <div className="w-full flex justify-center mt-[100px]">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-10 flex flex-col gap-3 w-[500px] max-w-full"
        >
          {currentUser && (
            <div className="flex items-center gap-3">
              <img
                src={currentUser.profilePicture || "/default-avatar.png"}
                alt={currentUser.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold">{currentUser.username}</span>
            </div>
          )}
          <div>
            <label className="md:text-[16px] text-[12px] font-semibold">
              Write A Description
            </label>
            {/* Caption */}
            <textarea
              placeholder="Write a caption..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="p-3 rounded-lg border-2 border-black w-full text-sm h-[100px]"
            />
          </div>

          {/* Hashtags */}
          <input
            type="text"
            placeholder="#hashtags (comma separated)"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            className="p-2 border-2 text-sm border-black rounded-lg"
          />

          {/* Drag & Drop Upload */}
          <div
            {...getRootProps()}
            className="border-2 border-black  rounded-lg p-6 text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            <div className="capitalize">
              <p className="md:text-[12px] text-[10px]">click to add image</p>
              <p className="md:text-[10px] text-[8px]">Or Drag & drop </p>
            </div>{" "}
          </div>

          {/* Carousel Preview */}
          {images.length > 0 && (
            <div className="relative w-full  overflow-hidden rounded-lg">
              <img
                src={images[currentIndex].preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
              {/* Navigation */}
              {currentIndex > 0 && (
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => prev - 1)}
                  className="absolute top-1/2 left-2 bg-black bg-opacity-50 text-white rounded-full p-2"
                >
                  ‹
                </button>
              )}
              {currentIndex < images.length - 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  className="absolute top-1/2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2"
                >
                  ›
                </button>
              )}
              {/* Edit/Delete */}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedImage(images[currentIndex]);
                    setCropModalOpen(true);
                  }}
                  className="bg-blue-500 text-white px-2 py-1 text-sm rounded"
                >
                  Crop
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setImages(images.filter((_, i) => i !== currentIndex))
                  }
                  className="bg-red-500 text-white px-2 py-1 text-sm rounded"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
           className="px-6 py-2 bg-green-500 text-white text-[14px] rounded-2xl hover:bg-[#FF0000] w-full"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      </div>

      {/* Crop Modal */}
      {cropModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-[90%] max-w-lg">
            <div className="relative w-full h-80 bg-gray-200">
              <Cropper
                image={selectedImage.preview}
                crop={crop}
                zoom={zoom}
                aspect={1} // square crop like IG
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setCropModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={applyCrop}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
      <BottomNav />
    </>
  );
};

export default CreatePost;
