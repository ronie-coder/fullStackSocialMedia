import React, { useEffect, useState } from "react";
import "./story.css";
import axios from "axios";
const Story = ({u}) => {
  const [onlineUser, setOnlineUser] = useState(null)
  useEffect(()=>{
    const fetchData =async ()=>{
      const res =await axios.get(`http://localhost:8800/api/user/userId/getUser/${u?.userId}`)
     setOnlineUser(res.data)
    }
    fetchData()
  },[u])
  return (
    <div className="storyContainer">
      <div className="storyImage">
        <img className="storyImageLocation"
          src={onlineUser?.profilePicture ? onlineUser.profilePicture : "https://freesvg.org/img/abstract-user-flat-4.png"}
          alt=""
        />
        <div className="onlineIndicator"></div>
      </div>
      <h5>{onlineUser?.username}</h5>
    </div>
  );
};

export default Story;
