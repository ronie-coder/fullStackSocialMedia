import React, { useEffect, useState } from 'react'
import './individualconversation.css'
import axios from 'axios'
import {Link} from 'react-router-dom'
const IndividualConversation = ({conversation, currentUser, allOnlineUsers}) => {
  const[friendOnline, setFriendOnline] = useState(false)
  const[friendId, setFriendId] = useState("")
  const [data, setdata] =useState({})
  useEffect(()=>{
    if(conversation.members[0] === currentUser._id){
      setFriendId(conversation.members[1])
    }else{
      setFriendId(conversation.members[0])
    }
  },[conversation,currentUser])
  console.log(friendOnline);
  useEffect(()=>{
    if(allOnlineUsers?.some(user=>user.userId === friendId)){

      setFriendOnline(true)
     }else{
      setFriendOnline(false)
     }
  },[allOnlineUsers,friendId])
  
  useEffect(()=>{
   
    console.log(friendId);
    const getUserData = async()=>{
      try {
        const res = await axios.get(`http://localhost:8800/api/user/userId/getUser/${friendId}`)
        setdata(res.data)
      } catch (error) {
        console.log(error);
      }
      

    }
    getUserData()
  },[friendId])
  return (
    <Link to={`/chat/${conversation._id}/${friendId}`} style={{textDecoration:"none",color:"black"}} className='individualConversationContainer'>
        <div className='individualConversationImage'>
            <img className='individualConversationImageReal' src={data.profilePicture ? data.profilePicture : "https://freesvg.org/img/abstract-user-flat-4.png"} alt="" />
            <div className={friendOnline ?"onlineofflineIndicator" : "onlineofflineIndicatorOffline"}></div>
        </div>
        <div className="conversationUserInfoAndLastMessage">
            <div className='conversationprofileName'>{data.username}</div>
            <h5 className='conversationLastMessage'>Perfect will check it🔥</h5>
        </div>
        <div className="conversationMessagetime">
            <h6 style={{fontWeight:"300"}}>Just Now</h6>
        </div>
    </Link>
  )
}

export default IndividualConversation