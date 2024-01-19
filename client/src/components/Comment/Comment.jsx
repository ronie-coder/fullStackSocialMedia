import React, { useEffect, useState } from 'react'

import './comment.css'
import axios from 'axios'
const Comment = ({c}) => {
  const[user, setUser] = useState(null)
  useEffect(()=>{
    const getUser = async()=>{
      const res = await axios.get(`http://localhost:8800/api/user/userId/getUser/${c.senderId}`)
      setUser(res.data)
    }
    getUser()
  },[c])
  return (
    <div className='singlecommentcontainer'>
      <span className='mentionUser'>@{user?.username}</span>
      <div className='commentDesc'>{c.text}</div>
    </div>
  )
}

export default Comment