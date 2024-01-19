import React, { useContext, useEffect, useState } from 'react'
import './home.css'
import AllStories from '../../components/AllStories/AllStories'
import NavigationButtons from '../../components/NavigationButtons/NavigationButtons'
import Feed from '../../components/Feed/Feed'
import { SocketContext } from '../../context/SocketContext/SocketContext'
import {io} from 'socket.io-client'
import { AuthContext } from '../../context/AuthContext'
const Home = () => {
  const {user: currentUser} = useContext(AuthContext)
  const {socket, setSocket, onlineUsers, setOnlineUsers} = useContext(SocketContext)
 
//   useEffect(()=>{
//     setSocket(io("ws://localhost:8900"))
// },[])
useEffect(()=>{
  socket?.emit("addUser",currentUser._id)
  socket?.on("getUsers",users=>{
    setOnlineUsers(users)
      console.log(users);
  })
},[currentUser,socket])
  return (
    <div className='home'>
        <div className="homeContainer">
          <NavigationButtons></NavigationButtons>
            <AllStories allOnlineUsers={onlineUsers}></AllStories>
            <Feed></Feed>
        </div>
    </div>
  )
}

export default Home