import React from 'react'
import Navbar from "../../components/Navbar"
import ProfileInfo from '../../sections/Profile/ProfileInfo'
import ProfileExplore from '../../sections/Profile/ProfileExplore'
import ProfileSaved from '../../sections/Profile/ProfileSaved'


const Profile = () => {
  return (
    <div>
      <Navbar />
      {/* <ProfileSaved /> */}
      <ProfileInfo />
      {/* <ProfileExplore /> */}
    </div>
  )
}

export default Profile