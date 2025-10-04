import React from 'react'
import Navbar from "../../components/Navbar"
import ProfileInfo from '../../sections/Profile/ProfileInfo'
import PageTransition from '../../components/PageTransition'


const Profile = () => {
  return (
    <div>
      <PageTransition />
      <Navbar />
      <ProfileInfo />
    </div>
  )
}

export default Profile