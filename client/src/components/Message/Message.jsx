import React, { useContext } from 'react'
import './message.css'
import { AuthContext } from '../../context/AuthContext'
import {format} from 'timeago.js'
const Message = ({chatData}) => {
  console.log(chatData);
    const {user:currentUser} = useContext(AuthContext)
    
    let owner;
    if(currentUser._id === chatData.sender){
        owner= true
    }else{
        owner = false;
    }
    
  return (
    <div className={owner ? 'ownerMessageContainer' : "individualMessageContainer"}>  
    {chatData.imgUrl && <img src={`${chatData.imgUrl}`} alt=''/>}
        <div className="messageFromFriend">{chatData.text}</div>
        <h5 className='timeOfIndividualChat'>{format(chatData.createdAt)}</h5>
    </div>
  )
}

export default Message