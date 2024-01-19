import React, { useContext, useEffect } from 'react'
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
function App() {
const {setSocket, socket} = useContext(SocketContext)
const {user} = useContext(AuthContext)

useEffect(()=>{
  user && setSocket(io("ws://localhost:8900"));
},[user])
  


  return (
    <Router>
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
      </Routes>
    </Router>
  )
}

export default App
