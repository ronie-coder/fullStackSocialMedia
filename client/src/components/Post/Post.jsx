import React, { useContext, useEffect, useState } from 'react'
import './post.css'
import { IoMenu } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { format } from "timeago.js";
import PostComments from '../PostComments/PostComments';
import axios from 'axios';
import { FaHeart } from "react-icons/fa";

import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Post = ({p}) => {

    const {user:currentUser} = useContext(AuthContext)
    const [owner, setowner] = useState({})
    const[CommentsParent, setCommentsParent] = useState(null)
    let[like, setLike] = useState(p.likes.length) 
    const[liked, setLiked] = useState(false)
    useEffect(()=>{
        if(p.likes.includes(currentUser._id)){
            setLiked(true);
        }
    },[])
    useEffect(()=>{
        const fetchComments = async () =>{
          try {
            const res =await axios.get(`http://localhost:8800/api/comments/${p._id}`)
            console.log(res.data);
            setCommentsParent(res.data)
          } catch (error) {
            console.log(error);
          }
         
        }
        fetchComments()
      },[p._id])
    const handleLike = async() =>{
        const res = await axios.put(`http://localhost:8800/api/posts/${p._id}/like`,{userId:currentUser._id})
        if(res.data === "unliked the post"){
            setLike(--like)
            setLiked(false)
        }else if(res.data === "liked the post"){
            setLike(++like)
            setLiked(true)
        }
    }
    useEffect(()=>{

    },[handleLike])
   
    useEffect(()=>{
        const findOwner =async ()=>{
            const res = await axios.get(`http://localhost:8800/api/posts/post/owner/${p._id}`)
            setowner(res.data)
        }
        findOwner();
    },[])
    const[hamburgerOpen,sethamburgerOpen] = useState(false)
    const[commentOpen, setCommentOpen] = useState(false)
  return (
    
    <div className='postContainer'>
        {hamburgerOpen && <div className="hamburgerMenu">
            <h4 className='hamburgermenuActionsHeading'>ACTIONS</h4>
            <div className="hamburgermenuActions"><h5>Report post</h5></div>
            <div className="hamburgermenuActions"><h5>I don't want to see this</h5></div>
            <RxCross2 onClick={()=>sethamburgerOpen(false)} className='hamburgerCrossIcon' size={25}/>
        </div>}
        
        <div className="postInfo">
            <div className="postInfoLeft">
                <Link to={`http://localhost:5173/profile/${owner.username}`}><img src={owner.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGf_8UZ3xLijdkOtv3qWnUpyknARbKMrcVJA&usqp=CAU"} alt="" /></Link>
                <div className="postInfoLeftDetails">
                    <div className="postInfoLeftDetailsname">{owner.username}</div>
                    <div className="postInfoLeftDetailsTime">{format(p.createdAt)}</div>
                </div>
            </div>
            <div className="postInfoRight">
            <IoMenu onClick={()=>sethamburgerOpen(true)} size={20}/>
            </div>
        </div>
            <div className='postHeroImageContainer'>
            <img className="postHeroImage" src={p.image} alt="" />
            </div>
            <div className="postDescription">{p.desc}</div>
            <div className="postInteractionIcons">
                <div onClick={handleLike} className="likeIconContainer">{liked ? <FaHeart style={{color:"red"}} size={20}/> : <FaRegHeart size={20}/>}<span style={{fontSize:"12px",fontWeight:"600"}}>{like} likes</span></div>
                <div onClick={()=>setCommentOpen(!commentOpen)} className="messageIconContainer"><AiOutlineMessage size={20}/><span style={{fontSize:"12px",fontWeight:"600"}}>{CommentsParent?.length} comments</span></div>
                
            </div>
            {commentOpen && <PostComments setCommentsParent={setCommentsParent} postId={p._id} CommentsParent={CommentsParent}></PostComments>}
            
    </div>
    
    
    
  )
}

export default Post