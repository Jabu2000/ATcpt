import React from 'react'
import Navbar from '../../components/Navbar'
import FTTDHero from '../../sections/FunThingsToDo/FTTDHero'
import Footer from '../../components/Footer'
import HomeInfo from '../../components/HomeInfo'
import transition from '../../transition'

const FunThingToDo = () => {

  return (
    <div>
      <Navbar />
      <FTTDHero  />
      <HomeInfo />
      <Footer />
    </div>
  )
}

export default transition(FunThingToDo)