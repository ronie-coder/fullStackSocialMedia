import React, { useContext, useEffect, useState } from 'react'
import { BsReddit } from "react-icons/bs";
import { BsPatchPlusFill } from "react-icons/bs";
import './navigationbutton.css'
import {Link, useParams} from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import { IoSearchCircle } from "react-icons/io5";
import { FaFacebookMessenger } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { SocketContext } from '../../context/SocketContext/SocketContext';

const NavigationButtons = () => {
  const {socket} = useContext(SocketContext)
 const {user:currentUser} = useContext(AuthContext)
const[notification, setNotification] = useState([])
 useEffect(()=>{
  socket?.on("getMessage",data =>{
      
      setNotification(previous=>[...previous,data])
      
  })
  console.log(notification)
},[socket,notification])
  return (
    <div className='navigationButtonContainer'>
      <div className='searchIconHomeContainerTop'>
        <Link style={{textDecoration:"none"}} to={`/profile/${currentUser.username}`}><BsReddit color='black' fontWeight={"100"} size={25} className='navigationButtonIcon'/></Link>
        <Link style={{textDecoration:"none"}} to={`/messengerAll`}><FaFacebookMessenger color='black' fontWeight={"100"} size={25} className='navigationButtonIcon'/></Link>
        </div>
        <h2 className='logo'>FreeChat</h2>
        <div className='searchIconHomeContainer'>

        <Link to={'/searchuser'}><IoSearchCircle color='black' size={31}/></Link>
        <div className="notificationIconContainer"><Link to={'/searchuser'}><IoIosNotifications color='black' size={31}/><div className={notification.length !==0 ? "countShow" : "nullCount"}>{notification?.length}</div></Link></div>
        <Link  to={'/createpost'}><BsPatchPlusFill color='black' size={26} className='navigationButtonIcon'/></Link>
        </div>
        
    </div>
  )
}

export default NavigationButtons