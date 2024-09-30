import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './videoroom.css'
import { SocketContext } from '../../context/SocketContext/SocketContext'
const VideoRoom = ({data, frieId}) => {
  console.log(frieId);
  const navigate = useNavigate();
  const {setSocket, socket} = useContext(SocketContext)
    const {user: currentUser} = useContext(AuthContext)
    const {conversationId} = useParams();
    const handleGoBAacktoConversationPage = () => {
      socket?.emit("videoCallEnded",{
        senderId: currentUser._id,
        recieverId: frieId,
        
      })
      navigate(`/messengerAll`)
    }
    useEffect(()=>{
      socket?.on("vidCallEnded",data =>{
        console.log("the person has left the call");
        navigate('/messengerAll')
      })
      
    },[socket,navigate])
    
    const MyMeeting = async(element) =>{
        const appID = 1657746677;
      const serverSecret = "4478b044a6416c2550f214755f66de1a";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, conversationId, Date.now().toString(),currentUser.username)
      const zc = ZegoUIKitPrebuilt.create(kitToken)
     
      zc.joinRoom({
        container: element,
        scenario:{
            mode: ZegoUIKitPrebuilt.OneONoneCall,
            
        },
        showPreJoinView: false,
        turnOnCameraWhenJoining:false,
        turnOnMicrophoneWhenJoining:false,
        
        
        showLeaveRoomConfirmDialog:false,
        showLeavingView:false,
        onUserLeave:()=>{
          navigate(`/messengerAll`)
        },
        

        
        
      })
      
      
    }
  return <div className='vidRoom'>
    
    <div className='innerVid' ref={MyMeeting}/>
    <div onClick={handleGoBAacktoConversationPage} className="button123container"><a className="button123">Go back</a></div>
  </div>
  
}

export default VideoRoom