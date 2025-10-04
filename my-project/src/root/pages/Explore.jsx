import React from 'react'
import Navbar from '../../components/Navbar'
import ExploreHero from "../../sections/Explore/ExploreHero"
import ExploreFYP from "../../sections/Explore/ExploreFYP"
import ExploreCategories from "../../sections/Explore/ExploreCategories"
import HomeInfo from "../../components/HomeInfo"
import Footer from "../../components/Footer"
import transition from '../../transition'

const Explore = () => {
  return (
    <div>
      <Navbar />
      <ExploreHero />
      <ExploreFYP />
      <ExploreCategories />
      <HomeInfo />
      <Footer />
    </div>
  )
}

export default transition(Explore)