import React from 'react'
import './profiledetails.css'
const Profiledetails = ({userdata}) => {
  return (
    <div className='profileDetailsContainer'>
        <div className="profileDetailsContainerInner">
        <div className="profileName">{userdata.username}</div>
        <div className="profileDescription">{userdata.desc ? userdata.desc : "*This user has not added any description"}</div>
        </div>
        
    </div>
  )
}

export default Profiledetails