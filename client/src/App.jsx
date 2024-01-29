import React, { useContext, useEffect, useState } from 'react'
import './App.css'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import CreatePost from './pages/CreatePost/CreatePost'
import { AuthContext } from './context/AuthContext'
import EditProfile from './pages/EditProfile/EditProfile'
import SearchUser from './pages/SearchUser/SearchUser'
import Conversation from './pages/Conversation/Conversation'
import Chat from './pages/Chat/Chat'
import { SocketContext } from './context/SocketContext/SocketContext'
import {io} from 'socket.io-client'
import VideoCall from './pages/videocall/VideoCall'
import BannerVideoCall from './components/BannerVideoCall/BannerVideoCall'
import axios from 'axios'
import VideoRoom from './pages/videoRoomPage/VideoRoom'
import { useNavigate } from 'react-router-dom'
function App() {
  const navigate = useNavigate()
  const[frieId,setfrieId] = useState("")
const {setSocket, socket} = useContext(SocketContext)
const {user} = useContext(AuthContext)
const[friendDetails, setfriendDetails] = useState(null)
let [convId, setconvId] = useState("")
useEffect(()=>{
  user && setSocket(io("ws://localhost:8900"));
},[user])
  
useEffect(()=>{
  socket?.on("AcceptOrRejectVideoCall",data =>{
    console.log(data.senderId);
    setfrieId(data.senderId)
      setconvId(data.conversationId)
      const getUser = async ()=>{
        console.log("call");
          try {
              const res = await axios.get(`http://localhost:8800/api/user/userId/getUser/${data.senderId}`)
              setfriendDetails(res.data)
              console.log(res.data);
          } catch (error) {
              console.log(error);
          }
      }
      getUser()
       
    console.log(data.senderId,data.conversationId);
})
},[socket,friendDetails,convId])

useEffect(()=>{
  socket?.on("callRejectedByOwner",data =>{
    console.log(data.message);
   setfriendDetails(null)
      
})
},[socket,friendDetails])
useEffect(()=>{
  socket?.on("callAccepted",data =>{
  navigate(`/video/room/${data.conversationId}`) 
  
    
})
},[socket,navigate])




  return (
      <>
      {friendDetails && <BannerVideoCall data={friendDetails} setData={setfriendDetails} convId={convId}></BannerVideoCall>}
      <Routes>
        <Route path='/' element={user ? <Navigate to={'/home'}/> : <Login/>}/>
        <Route path='/register' element={user ? <Navigate to={'/home'}/> : <Register/>}/>
        <Route path='/home' element={user ? <Home/> : <Navigate to={'/'}/>}/>
        <Route path='/profile/:username' element={user ? <Profile/> : <Navigate to={'/'}/>}/>
        <Route path='/createpost' element={user ? <CreatePost/> : <Navigate to={'/'}/>}/>
        <Route path='/editprofile' element={user ? <EditProfile/>: <Navigate to={'/'}/>}/>
        <Route path='/searchuser' element={user ? <SearchUser/> : <Navigate to={'/'}/>}/>
        <Route path='/messengerAll' element={user ? <Conversation/> : <Navigate to={'/'}/>}/>
        <Route path='/chat/:conversationId/:friendId' element={user ? <Chat/> : <Navigate to={'/'}/>}/>
        <Route path='/video/:conversationId/:friendId' element={user ? <VideoCall/> : <Navigate to={'/'}/>}/>
        <Route path='/video/room/:conversationId' element={user ? <VideoRoom data={friendDetails} frieId={frieId} setData={setfriendDetails}/> : <Navigate to={'/'}/>}/>
      </Routes>
      </>
  )
}

export default App
