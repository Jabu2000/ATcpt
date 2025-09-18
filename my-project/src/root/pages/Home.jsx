import React from "react";
import HomeCategories from "../../sections/Home/HomeCategories";
import LeftSidebar from "../../components/LeftSidebar";
import RightSidebar from "../../components/RightSidebar";
import BottomNav from "../../components/BottomNav";
import TopNav from "../../components/TopNav";

const Home = ({ posts, newPostId }) => {
  return (
    <div className="w-full bg-black flex flex-row">
      <div className="hidden lg:block">
        <LeftSidebar />
      </div>
      <HomeCategories posts={posts} newPostId={newPostId} />
      <RightSidebar />
      <TopNav />
      <BottomNav />
    </div>
  );
};

export default Home;