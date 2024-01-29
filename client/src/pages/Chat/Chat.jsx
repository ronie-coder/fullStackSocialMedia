import React, { useContext, useEffect, useRef, useState } from 'react'
import './chat.css'
import { PiSticker } from "react-icons/pi";
import { RxDividerVertical } from "react-icons/rx";
import { AiOutlineSend } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa6";
import Message from '../../components/Message/Message';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../../firebase';
import { v4 as uuid } from "uuid";
import axios from 'axios';
import { SocketContext } from '../../context/SocketContext/SocketContext';
import { IoIosVideocam } from "react-icons/io";


const Chat = () => {
    
    const[chatImg, setChatImg] = useState(null);
    const[friendOnline, setFriendOnline] = useState(false)
    const scrollRef = useRef()
    const[textMsg, setTextMsg] = useState("")
    const[chats, setChats] = useState([])
    const[friendDetails, setfriendDetails] = useState({})
    const{socket, setSocket, onlineUsers, setOnlineUsers} = useContext(SocketContext)
    const[arrivalMsg, setArrivalMsg] = useState(null)
    const params = useParams()

   const findIfFriendOnline = (users) =>{
   if(onlineUsers?.some(user=>user.userId === params.friendId)){
    setFriendOnline(true)
   }else{
    setFriendOnline(false)
   }
   }
   
   
   
    const {user: currentUser} = useContext(AuthContext)

    useEffect(()=>{
        findIfFriendOnline(onlineUsers)
    },[socket,onlineUsers])

    
    
    const handleFormSubmit =async (e)=>{
        e.preventDefault();
       
        
       
        const imgPicStorageRef = ref(storage, uuid());
        await uploadBytesResumable(imgPicStorageRef, chatImg);
        console.log("getting download url for profile pic", e);
        const downloadURL = await getDownloadURL(imgPicStorageRef);
        const data = {
            conversationId: params.conversationId,
            sender: currentUser._id,
            text:textMsg,
            imgUrl:downloadURL,
        }
        socket.emit("sendMessage",{
            senderId: currentUser._id,
            recieverId: params.friendId,
            text:textMsg,
            imgUrl:downloadURL
        })
        console.log(downloadURL);
        try {
            const res =await axios.post(`http://localhost:8800/api/messages/`,data)
            
            setChats([...chats,res.data])
            setTextMsg("")
            setChatImg(null)
          console.log(submitted);
         
        } catch (error) {
          console.log(error);
        }
  
        
    }
    const handleVideoCallReq =async ()=>{
       await  socket?.emit("requestToAcceptVideoCall",{
            senderId : currentUser._id,
            recieverId : params.friendId,
            conversationId: params.conversationId
        })
        navigate(`/video/${params.conversationId}/${params.friendId}`)
    }

    useEffect(()=>{
        socket?.on("getMessage",data =>{
            
            setArrivalMsg({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
            console.log(arrivalMsg)
        })
    },[handleFormSubmit,socket,arrivalMsg])

    useEffect(()=>{
        arrivalMsg && setChats([...chats,arrivalMsg])
        setArrivalMsg(null)
    },[arrivalMsg,chats])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[chats])

    useEffect(()=>{
        const getUser = async()=>{
            try {
                const res = await axios.get(`http://localhost:8800/api/user/userId/getUser/${params.friendId}`)
                setfriendDetails(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getUser()
    },[])
    useEffect(()=>{
        const getAllMessages = async ()=>{
            try {
                const res = await axios.get(`http://localhost:8800/api/messages/${params.conversationId}`)
                console.log(res.data);
                setChats(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getAllMessages()
    },[])
    const navigate = useNavigate()
    const handlePrevious = ()=>{
        navigate(-1)
    }
  return (
    <div className='chatMainContainer'>
        <div className="chatPageTopInfo">
        <FaArrowLeft onClick={handlePrevious} size={24}/>
        <div className='individualConversationImageChat'>
            <img className='individualConversationImageReal' src={friendDetails.profilePicture ? friendDetails.profilePicture : "https://freesvg.org/img/abstract-user-flat-4.png"} alt="" />
            <div className={friendOnline ? "onlineofflineIndicatorChatOnline" : "onlineofflineIndicatorChatOffline"} ></div>
        </div>
        <div className="conversationUserInfoAndLastMessageChat">
            <div className='conversationprofileNameChat'>{friendDetails.username}</div>
            <h5 className={friendOnline? 'conversationLastMessageChat':'conversationLastMessageChatOffline'}>{friendOnline ? "Online" : "Offline"}</h5>
        </div>
        <div className='videoCallIcon'><IoIosVideocam onClick={handleVideoCallReq}  size={25}/></div>
        
        </div>


        <div className="allMessagesContainer">
            {chats && chats.map(c =>(
                <div ref={scrollRef}>
                <Message chatData={c}></Message>
                </div>
            ))}
            {!chats &&  <h3 className='defaultTextChat' color='black'>Send a message</h3>}
            
        </div>


        <form onSubmit={handleFormSubmit} className="chatInputMessage">
            <input value={textMsg} onChange={(e)=>setTextMsg(e.target.value)} type="text" className="enterTextInputMessage" />
            <input type="file" id="imgChat" style={{display:"none"}}/>
            <label style={{height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}} htmlFor="imgChat"><PiSticker size={23} className='stickerIcon'/></label>
            <RxDividerVertical size={26} className='verticalLineIcon'/>
            <button style={{display:"flex", alignItems:"center"}} type='submit'><AiOutlineSend size={20} className='chatSendLineIcon'/></button>
        </form>
    </div>
  )
}

export default Chat