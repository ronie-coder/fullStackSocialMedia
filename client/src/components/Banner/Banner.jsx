import React from 'react'
import './banner.css'
import { Link } from 'react-router-dom'
const Banner = ({userfound}) => {
  return (
     <Link  style={{textDecoration:"none"}} to={`/profile/${userfound.username}`} className='searchBannerContainer'>
        <img className='searchedUserimage' src={userfound.profilePicture || "https://freesvg.org/img/abstract-user-flat-4.png"} alt="" />
        <span style={{color:"black"}} className='searchedUserName'>{userfound.username}</span>
    </Link>
    
  )
}

export default Banner