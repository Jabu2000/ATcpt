import React from 'react'
import Navbar from '../../components/Navbar'
import NightLifeHero from '../../sections/NightLife/NightLifeHero'
import NightLifeCategories from '../../sections/NightLife/NightLifeCategories'
import Footer from '../../components/Footer'
import NightLifeExplore from '../../sections/NightLife/NightLifeExplore'

const NightLife = () => {
  return (
    <div>
      <Navbar />
      <NightLifeHero />
      <NightLifeExplore />
      <Footer />
    </div>
  )
}

export default NightLife