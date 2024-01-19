import React from 'react'
import './userpostthumbnail.css'
const UserPostThumbnail = ({userPostData}) => {
  return (
    <div className='userPostThumbnailContainer'>
        <img className='thumbnailImage' src={userPostData.image} alt="" />
    </div>
  )
}

export default UserPostThumbnail