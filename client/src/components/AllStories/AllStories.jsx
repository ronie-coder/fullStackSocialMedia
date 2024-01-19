import React, { useContext } from 'react'
import './allstories.css'
import Story from '../Story/Story'
import { AuthContext } from '../../context/AuthContext'
const AllStories = ({allOnlineUsers}) => {
  const {user: currentUser} = useContext(AuthContext)
  return (
    <div className='allStoriesContainer'>
      {allOnlineUsers?.length === 1 ? <h3>No online user</h3> : allOnlineUsers?.filter((user)=>user.userId !== currentUser._id).map((u)=>(
        <Story u={u}></Story>
      ))}
       
    </div>
  )
}

export default AllStories