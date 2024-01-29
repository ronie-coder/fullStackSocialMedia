import React, { useContext } from 'react'
import './bannervideocall.css'
import { BsTelephoneFill  } from "react-icons/bs";
import { SocketContext } from '../../context/SocketContext/SocketContext';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const BannerVideoCall = ({data, setData, convId}) => {
    const navigate = useNavigate()
    const {user: currentUser} = useContext(AuthContext)
    const {setSocket, socket} = useContext(SocketContext)
    const handleReject = () =>{
        socket?.emit("rejectCall",{
            senderId: currentUser._id,
            recieverId: data._id
        },)
        setData(null)
    }
    const handleJoinRoom = () =>{
        socket?.emit("callAccept",{
            senderId: currentUser._id,
            recieverId: data._id,
            conversationId: convId,
        })
        setData(null)
        navigate(`/video/room/${convId}`)
    }
  return (
    <div className='bannerVideoCall'>
        <img src={data.profilePicture ? data.profilePicture : "https://freesvg.org/img/abstract-user-flat-4.png"} alt="" />
        <div style={{paddingRight:"20vw"}}>{data.username}</div>
        <div onClick={handleJoinRoom} style={{padding:"11px",borderRadius:"50%",display:"flex",
    alignItems:"center",justifyContent:"center",backgroundColor:"lightgreen"}}><BsTelephoneFill  color='white' size={25}/></div>
        <div onClick={handleReject} style={{padding:"11px",borderRadius:"50%",display:"flex",
    alignItems:"center",justifyContent:"center",backgroundColor:"red"}}><BsTelephoneFill  color='white' size={25}/></div>
    </div>
  )
}

export default BannerVideoCall