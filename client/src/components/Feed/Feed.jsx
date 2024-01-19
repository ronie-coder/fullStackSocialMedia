import React, { useContext, useEffect, useState } from 'react'
import './feed.css'
import Post from '../Post/Post'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
const Feed = () => {
  const {user: currentUser} = useContext(AuthContext)
  const[allTimelinePosts, setAllTimelinePosts] = useState([])
  useEffect(()=>{
    const fetchData = async()=>{
      const res = await axios.get(`http://localhost:8800/api/posts/${currentUser._id}/timeline/all`)
      console.log(res.data);
      setAllTimelinePosts(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    }
    fetchData()
    
  },[])
  return (
    
    <div className='homePageFeed'>
      {allTimelinePosts.map((p)=>(
        <Post p={p}></Post>
      ))}
        
    </div>
  )
}

export default Feed