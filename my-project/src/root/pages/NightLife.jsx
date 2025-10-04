import React from 'react'
import Navbar from '../../components/Navbar'
import NightLifeHero from '../../sections/NightLife/NightLifeHero'
import Footer from '../../components/Footer'
import NightLifeExplore from '../../sections/NightLife/NightLifeExplore'
import HomeInfo from '../../components/HomeInfo'
import transition from '../../transition'

const NightLife = () => {
  return (
    <div>
      <Navbar />
      <NightLifeHero />
      <NightLifeExplore />
      <HomeInfo />
      <Footer />
    </div>
  )
}

export default transition(NightLife)