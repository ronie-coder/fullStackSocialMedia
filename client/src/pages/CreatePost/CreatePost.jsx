import React, { useContext, useState } from 'react'
import './createpost.css'
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { storage } from '../../../firebase';
import { BsPatchPlusFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { Link } from 'react-router-dom';
import {v4 as uuid} from 'uuid'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const CreatePost = () => {
    const [uploading, setuploading] = useState(false)
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const {user: currentUser} = useContext(AuthContext)
    const[file, setfile] = useState(null)
    const[posttext, setPosttext] = useState("") 
    const handleSubmit =async(e) =>{
        e.preventDefault();
        setuploading(true)
const storageRef = ref(storage, uuid());

await uploadBytesResumable(storageRef, file).then(()=>{
    
    getDownloadURL(storageRef).then(async(downloadURL)=>{
        try {
            await axios.post("http://localhost:8800/api/posts",{
            userId : currentUser._id,
            desc: posttext,
            image: downloadURL
            })
            setError(false)
            console.log("uploaded post successfully");
            setuploading(false)
            navigate('/home')
            
          } catch (error) {
            setError(true)
            setuploading(false)
            console.log(error);
          }
    })
})

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
// uploadTask.on('state-changed',
// (snapshot) => {
//     // Observe state change events such as progress, pause, and resume
//     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Upload is ' + progress + '% done');
//     switch (snapshot.state) {
//       case 'paused':
//         console.log('Upload is paused');
//         break;
//       case 'running':
//         console.log('Upload is running');
//         break;
//     }
//   },
//   (error) => {
//     console.log(error);
//   }, 
//   () => {
//     // Handle successful uploads on complete
//     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//       try {
//         await axios.post("http://localhost:8800/api/posts",{
//         userId : currentUser._id,
//         desc: posttext,
//         image: downloadURL
//         })
//         console.log("uploaded post successfully");
//       } catch (error) {
//         console.log(error);
//       }
//     });
//   }
// );
    }
  return (
    <div className='createPostmainContainer'>
        <form onSubmit={handleSubmit} className="createpostInnerContainer">
            <img className='addPostanimated' src="https://i.pinimg.com/originals/f0/dc/3b/f0dc3bf8205cb226faf16ef162e62eb5.gif" alt="" />
            <div className="createPostWelcomeMessage">Hey There <span style={{fontSize:"1.2rem",color:"skyblue"}}>{currentUser.username}</span>👋</div>
            <div className="createPostWelcomeMessageSuggestion">Create your post and share it with your friends and family</div>
            {file && <div className="uploadImageTempView">
                <img src={URL.createObjectURL(file)} alt="" className="uploadImageTempViewIn" />
                <MdDeleteForever onClick={()=>setfile(null)} size={25} />
            </div>}
            
            <label style={{fontWeight:"600"}} className='addPostImageIconContainer' htmlFor="postImageInput"><BsPatchPlusFill size={46}/>Add Image</label>
            
            <input onChange={(e)=>setfile(e.target.files[0])} style={{display:"none"}} type="file" id="postImageInput" />
            <div className="postTextAreaContainer">
                <h4>Tell us something about this post</h4>
            <textarea value={posttext} onChange={(e)=>setPosttext(e.target.value)} placeholder='Enter description...' className='postTextArea' name="" id="" cols="30" rows="10"></textarea>
            <RxCross1 onClick={()=>setPosttext("")} className='posttestarecross'/>
            </div>
            <div className="createPostButtons">
                <button type='submit' className='createPostButton'>Post</button>
                <Link to={'/home'}><button className='discardPostButton'>Discard</button></Link>
            </div>
            {uploading && <div class="spinner-7"></div>}
            {error && <div className='createpostErrorMessage'>
            <h4>Error! try again</h4>
            </div>}
            
        </form>
    </div>
  )
}

export default CreatePost