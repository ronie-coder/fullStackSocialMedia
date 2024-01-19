import React, { useContext, useEffect, useState } from 'react'
import './searchuser.css'
import { IoSearchCircleSharp } from "react-icons/io5";
import Banner from '../../components/Banner/Banner';
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
const SearchUser = () => {
  const navigate = useNavigate()
  const {user: currentUser} = useContext(AuthContext)
  const[typing, setTyping] = useState(false)
  const[currentUserDetails, setcurrentUserdetails] = useState({})
  const[searchedUser, setSearchedUser] = useState("");
  const[foundUser, setFounduser] = useState(null)

  const handlePreviousPageVisit = () =>{
    navigate(-1)
  }

  useEffect(()=>{
    const finduser =async ()=>{
      try {
        const res = await axios.get(`http://localhost:8800/api/user/${searchedUser}`)
        setFounduser(res.data)
      } catch (error) {
        setFounduser(null)
      }
      
    }
    finduser()
  },[searchedUser])

  useEffect(()=>{
    const fetch =async () =>{
      const res = await axios.get(`http://localhost:8800/api/user/${currentUser.username}`)
      setcurrentUserdetails(res.data)
    }
    fetch()
   
  },[currentUser])
  useEffect(()=>{
    if(!searchedUser){
      setTyping(false)
    }
  },[searchedUser])
  return (
    <div className='searchUserMainContainer'>
      <div className="searchUserInnerContainer">
        <div className="searchUserBanner">
          <div className="searchUserBannerLeft">
            <div className="searchUserBannerLeftGreeting"><FaArrowLeft onClick={handlePreviousPageVisit} size={29} color='black'/>Hello.</div>
            <div className="searchUserBannerLeftName">{currentUserDetails.username}</div>
          </div>
          <Link to={`/profile/${currentUser.username}`} className="searchUserBannerRight">
            <img className='searchUserBannerRightImage' src={currentUserDetails.profilePicture ? currentUserDetails.profilePicture : "https://freesvg.org/img/abstract-user-flat-4.png"} alt="" />
          </Link>
        </div>
        <div className="searchUserInputNameContainer">
          <input  onChange={(e)=>{setSearchedUser(e.target.value); setTyping(true)}} placeholder='Search user...' className='searchUserInputBox' type="text" />
          <IoSearchCircleSharp size={34} className='searchPagereactIcon'/>
        </div>
        <div className="bannerAllContainer">
          {foundUser ? <Banner userfound={foundUser}/> : <h1>No user</h1>}
         {typing ? <h3>Typing...</h3> : <h3>Type to search</h3>}
        </div>
      </div>
    </div>
  )
}

export default SearchUser