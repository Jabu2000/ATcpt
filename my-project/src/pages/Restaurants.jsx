import React from 'react'
import Navbar from "../../components/Navbar"
import RestaurantHero from '../../sections/Restaurant/RestaurantHero'
import RestaurantsExplore from '../../sections/Restaurant/RestaurantExplore'
import Footer from '../../components/Footer'

const Restaurants = () => {
  return (
    <div>
      <Navbar />
      <RestaurantHero />
      <RestaurantsExplore />
      <Footer />
    </div>
  )
}

export default Restaurants