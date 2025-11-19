import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import StoresHero from '../sections/Stores/StoresHero'
import HomeInfo from '../components/HomeInfo'
// import StoresCategories from '../../sections/Stores/StoreCategories'

const Stores = () => {
  return (
    <div>
      <Navbar />
      <StoresHero />
      <HomeInfo />
      {/* <StoresCategories /> */}
      <Footer />
    </div>
  )
}

export default Stores