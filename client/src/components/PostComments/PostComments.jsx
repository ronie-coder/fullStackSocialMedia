import React, { useContext, useEffect, useState } from 'react'
import Comment from '../Comment/Comment'
import { IoMdSend } from "react-icons/io";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
const PostComments = ({postId, setCommentsParent,CommentsParent}) => {
  const[comments, setComments] = useState(null)
  const[msg, setmsg] = useState("")
  const{user: currentUser} = useContext(AuthContext)
  console.log(postId);
  const handleCommentUpload = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8800/api/comments/',{
      senderId: currentUser._id,
      text:msg,
      postId:postId
      })
      console.log(res.data);
      setComments([...comments,res.data])
      setCommentsParent([...CommentsParent,res.data])
      setmsg("")
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    const fetchComments = async () =>{
      try {
        const res =await axios.get(`http://localhost:8800/api/comments/${postId}`)
        console.log(res.data);
        setComments(res.data)
      } catch (error) {
        console.log(error);
      }
     
    }
    fetchComments()
  },[postId])
  
  return (
    <div className="commentsContainer">
      {comments?.map((c)=>(
        <Comment c={c}></Comment>
      ))}
                
                <form onSubmit={handleCommentUpload} className="postInputContainer">
                <input placeholder='Comment on this post...' value={msg} onChange={(e)=>setmsg(e.target.value)} className='postCommentInput' type="text" />
                <button type='submit'><IoMdSend size={20} className='postCommentSendIcon'/></button>
                </form>
            </div>
  )
}

export default PostComments