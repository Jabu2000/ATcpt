import React from "react";
import Navbar from "../../components/Navbar";
import PTVHero from "../../sections/PlaceToVisit/PTVHero"
import PTVCategories from "../../sections/PlaceToVisit/PTVCategories"
import Footer from "../../components/Footer";
import PTVExplore from "../../sections/PlaceToVisit/PTVExplore"

const PlaceToVisit = () => {
  return (
    <div>
      <Navbar />
      <PTVHero />
      <PTVExplore />
      {/* <PTVCategories /> */}
      <Footer />
    </div>
  );
};

export default PlaceToVisit;
