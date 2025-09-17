import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/forms/Login";
import Signup from "./auth/forms/Signup";
import ProtectedRoute from "./components/ProtectRoute";
import Explore from "./root/pages/Explore";
import Home from "./root/pages/Home";


import Profile from "./root/pages/Profile";


import Restaurants from "./root/pages/Restaurants";
import RestaurantDetail from "./root/pages/RestaurantDetail";
import EditRestaurant from "./root/pages/EditRestaurant";

import NightLife from "./root/pages/NightLife";
import NightLifeDetail from "./root/pages/NightLifeDetail";

import Stores from "./root/pages/Stores";
import StoreDetail from "./root/pages/StoreDetail";

import FunThingToDo from "./root/pages/FunThingToDo";
import FunThingToDoDetail from "./root/pages/FunThingToDoDetail";

import PlaceToVisit from "./root/pages/PlaceToVisit";
import PlaceToVisitDetail from "./root/pages/PlaceToVisitDetail";

import Accommodation from "./root/pages/Accommodation";
import AccommodationDetail from "./root/pages/AccommodationDetail";

import { Toaster, toast } from "react-hot-toast";
import CreatePost from "./root/pages/CreatePost";





function App() {
  const [posts, setPosts] = useState([]);
  const [newPostId, setNewPostId] = useState(null);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
    setNewPostId(newPost.id); // track the latest post
    toast.success("✅ Post created successfully!");
  };

  return (
    <>
      {/* Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home posts={posts} newPostId={newPostId} />
            </ProtectedRoute>
          }
        />
        <Route path="explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route path="/restaurants/:id/edit" element={<EditRestaurant />} />

        <Route path="/activities" element={<FunThingToDo />} />
        <Route path="/activities/:id" element={<FunThingToDoDetail />} />

        <Route path="/events" element={<NightLife />} />
        <Route path="/events/:id" element={<NightLifeDetail />} />

        <Route path="/stores" element={<Stores />} />
        <Route path="/stores/:id" element={<StoreDetail />} />

        <Route path="/places" element={<PlaceToVisit />} />
        <Route path="/places/:id" element={<PlaceToVisitDetail />} />

        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/accommodation/:id" element={<AccommodationDetail />} />

        <Route
          path="/create-post"
          element={<CreatePost onPostCreated={handlePostCreated} />}
        />
      </Routes>
    </>
  );
}

export default App;
