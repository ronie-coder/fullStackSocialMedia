import React, { useContext, useEffect, useState } from 'react'
import './conversation.css'
import { GoSearch } from "react-icons/go";
import { LiaEditSolid } from "react-icons/lia";
import { AuthContext } from "../../context/AuthContext";
import IndividualConversation from '../../components/IndividualConversation/IndividualConversation';
import { FaArrowLeft } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {io} from 'socket.io-client'
import { SocketContext } from '../../context/SocketContext/SocketContext';
const Conversation = () => {
    const navigate = useNavigate()
    const{socket, setSocket, onlineUsers, setOnlineUsers} = useContext(SocketContext)
    const[allConversations, setConversations] = useState([])
    const[allOnlineUsers, setAllOnlineUsers] = useState([])
    const {user:currentUser} = useContext(AuthContext)
    const handlePrevious = ()=>{
        navigate(`/home`)
    }
    
   
    useEffect(()=>{
        const fetchAllUserConversations = async()=>{
            try {
                const res = await axios.get("http://localhost:8800/api/conversations/"+currentUser._id)
               
                setConversations(res.data)
            } catch (error) {
                console.log(error);
            }
           
        }
        fetchAllUserConversations()
    },[currentUser])
  return (
    <div className='conversationpagecontainer'>
        <div className="conversationpageinnerContainer">
            <div className="conversationPageHeading"><FaArrowLeft onClick={handlePrevious}/>All Chats</div>
            <div className="conversationPageTop">
                <div className="messengerSearchandIconContainer">
                    <input placeholder='Search for friends...' type="text" className="conversationInput" />
                    <GoSearch size={22} className='conversationSearchIcon'/>
                </div>
                </div>
            <div className="allConversationItemContainer">
                {allConversations.map(c=>(
                    <IndividualConversation  conversation={c} currentUser={currentUser} allOnlineUsers={onlineUsers}></IndividualConversation>
                ))}
                
            </div>
            
        </div>
    </div>
  )
}

export default Conversation