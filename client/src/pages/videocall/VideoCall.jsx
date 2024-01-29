import React, { useContext, useEffect, useState } from 'react'
import './videocall.css'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import { BsTelephoneFill  } from "react-icons/bs";
import axios from 'axios';
import Timer from '../../components/Timer/Timer';
import { SocketContext } from '../../context/SocketContext/SocketContext';
import { AuthContext } from '../../context/AuthContext';
const VideoCall = () => {
    
    const{socket, setSocket, onlineUsers, setOnlineUsers} = useContext(SocketContext)
    const{user : currentUser} = useContext(AuthContext)
    const [friendDetails, setfriendDetails] = useState()
    const params = useParams()
    const navigate = useNavigate()
    const handlePrev = ()=>{
        
        socket?.emit("selfRejectCall",{
            senderId: currentUser._id,
            recieverId: params.friendId
        })
        navigate(-1)
    }
   
        

   useEffect(()=>{
  socket?.on("callRejected",data =>{
    console.log(data.message);
   navigate(-1)
      
      
})
},[socket,navigate])
       
    
   
    useEffect(()=>{
        const getUser = async()=>{
            try {
                const res = await axios.get(`http://localhost:8800/api/user/userId/getUser/${params.friendId}`)
                setfriendDetails(res.data)
                console.log(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getUser()
    },[params.friendId])
  return (
    <div className='videocallcontainer' >
        <div className="friendDetailsVideo">
            <img className='videofriendProfilePic' src={friendDetails?.profilePicture ? friendDetails?.profilePicture : "https://freesvg.org/img/abstract-user-flat-4.png"} alt="" />
            <div style={{fontWeight:"900"}}>{friendDetails?.username}</div>
            <Timer></Timer>
        </div>
        <div className="videoLowerIcons"><div style={{padding:"11px",borderRadius:"50%",display:"flex",
    alignItems:"center",justifyContent:"center",backgroundColor:"red"}}><BsTelephoneFill onClick={handlePrev}   color='white' size={30}/></div></div>
        </div>
  )
}

export default VideoCall