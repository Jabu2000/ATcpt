import React from "react";
import HomeCategories from "../../sections/Home/HomeCategories";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";

const Home = ({ posts, newPostId }) => {
  return (
    <div className="w-full flex flex-row">
      <LeftSidebar />
      <HomeCategories posts={posts} newPostId={newPostId} />
      <RightSidebar />
    </div>
  );
};

export default Home;