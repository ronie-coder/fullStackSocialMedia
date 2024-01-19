import React, { useContext, useEffect, useState } from "react";
import "./profile.css";
import { FaBellSlash } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Profiledetails from "../../components/ProfileDetails/Profiledetails";
import UserPostThumbnail from "../../components/UserPostThumbnail/UserPostThumbnail";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {logoutCall} from '../../apiCalls'
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext/SocketContext";
const Profile = () => {
  const{socket} = useContext(SocketContext)
  const [conversationId, setConversationId] = useState("")
  const navigate = useNavigate()
  const {user:currentUser,dispatch} = useContext(AuthContext)
    const {username} = useParams()
  const [loading,setLoading] = useState(true)  
  const [userdata, setUserdata] = useState({});
  const [userPostData, setUserPostData] = useState(null);
  const[follow, setFollow] = useState(false)
  console.log(currentUser._id);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8800/api/user/${username}`);
      
      setUserdata(res.data);
      if(res.data.followers.includes(currentUser._id)){
        setFollow(true)
      }
      setLoading(false)
      setFollowersLength(res.data.followers.length)
      setFollowingLength(res.data.following.length)
    };
    fetchData();
  }, [username,follow,currentUser]);
  
  const handleMessage =async ()=>{
    try {
      const res = await axios.get(`http://localhost:8800/api/conversations/${currentUser._id}/${userdata._id}`)
      console.log(res);
      if(res.data === "Does not exist"){
        try {
          const createCon = await axios.post(`http://localhost:8800/api/conversations/`,{
            senderId: currentUser._id,
            recieverId: userdata._id,
          })
          console.log(createCon);
          setConversationId(createCon.data._id)
          navigate(`/chat/${createCon.data._id}/${userdata._id}`)
        } catch (error) {
          console.log(error);
        }
      }else{
        setConversationId(res.data._id)
        navigate(`/chat/${res.data._id}/${userdata?._id}`)
      }
    
      
    } catch (error) {
      console.log(error);
    }
  }
  const handleLogOut = () =>{
    socket.emit("logoutUser",{
      socketId:socket.id
    })
    logoutCall(dispatch)
    navigate('/')
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:8800/api/posts/${userdata._id}/posts`,
        );
        console.log(res.data);
      setUserPostData(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    };
    fetchData();
  }, [userdata]);
  const handleFollow =async () =>{
    if(follow){
      await axios.put(`http://localhost:8800/api/user/${userdata._id}/follow`,{
        userId: currentUser._id
      })
      setFollow(false)
    }else{
      await axios.put(`http://localhost:8800/api/user/${userdata._id}/follow`,{
        userId: currentUser._id
      })
      setFollow(true)
    }
  }
  return (
    <div className="profilemainContainer">
      <div className="profilePageNavigationButtons">
        <Link to={"/home"}>
          <div className="profileNavigationIcons">
            <FaArrowLeft color="black"/>
          </div>
        </Link>
        <div className="profileNavigationIcons">
          <FaBellSlash />
        </div>
      </div>
      <div className="profileImageCoverImgContainer">
        <div className="profileCoverImg">
          <img
            src={
              userdata.coverPicture ||
              "data:image/png;base64,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"
            }
            alt=""
            className="coverImage"
          />
        </div>
        <div className="profileimageinnerContainer">
          <img
            src={
              userdata.profilePicture ||
              "https://freesvg.org/img/abstract-user-flat-4.png"
            }
            alt=""
            className="profileImage"
          />
        </div>
      </div>
      {!loading && <div className="followersInfoContainer">
        <div className="followersInfo">
          <h5>{userdata.followers.length}</h5>
          <h6>Followers</h6>
        </div>
        <div className="followersInfo">
          <h5>{userdata.following.length}</h5>
          <h6>Following</h6>
        </div>
      </div>}
      {loading && <div className="loaderAnimationContainer"><div class="loader"></div></div>}

      <Profiledetails userdata={userdata}></Profiledetails>
      {userdata._id !== currentUser._id && <div className="FollowAndMessageButtonsContainer">
        {userdata._id === currentUser._id}
        <button onClick={handleFollow}  style={follow ? {backgroundColor:"red"} : {backgroundColor:"#A975FF"}} className="followButton">{follow ? "UNFOLLOW" : "FOLLOW"}</button>
        <div style={{textDecoration:"none"}} onClick={handleMessage} className="messageButton">Message</div>
      </div>}
      {userdata._id === currentUser._id && <div className="FollowAndMessageButtonsContainer">
        
        <Link to={'/editprofile'}><button className="followButton">Edit Profile</button></Link>
        <button onClick={handleLogOut} style={{backgroundColor:"#db4243"}} className="followButton">Logout</button>
      </div>}
      
      <div className="allUserPostsContainer">
        {userPostData && userPostData.map((up)=>(
            <UserPostThumbnail key={up._id} userPostData={up}></UserPostThumbnail>
        ))}
        {userPostData?.length === 0 && <h3>No posts to show</h3>}

      </div>
    </div>
  );
};

export default Profile;
