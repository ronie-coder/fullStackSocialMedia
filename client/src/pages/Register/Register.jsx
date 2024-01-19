import React, { useState } from 'react'
import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuEyeOff } from "react-icons/lu";
import { CiUser } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import './register.css'
import axios from 'axios';
const Register = () => {
    const [hidden, setHidden] = useState(true);
    const [username, setUsername] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleSubmit =async (e)=>{
      e.preventDefault();
      const payload = {
        username: username,
        email:email,
        password: password,
      }
      console.log(email)
      try {
        await axios.post("http://localhost:8800/api/auth",payload)
        console.log("successfully registered");
        navigate('/')
      } catch (error) {
        console.log("Error registering")
      }
    }
  return (
    <div className='login'>
        <div className="loginContainer">
            <div className='registerLeftArrow'><Link style={{textDecoration:"none",color:"white"}} to={'/'}><FaArrowLeft /></Link></div>
            <form onSubmit={handleSubmit} className="loginmid">
              <h2 style={{paddingLeft:"8px"}}>Create Account</h2>
              <h5 style={{paddingLeft:"8px"}}>Please fill your details below</h5>
              <div className='loginMidInputContainer'>
                <div className="loginInputContainerName">
                  <h6>USERNAME</h6>
                </div>
                <div className="iconinput">
                <CiUser  className='mailIcon'/>
                <input onChange={(e)=>setUsername(e.target.value)} placeholder='Enter username...' className='loginInputEmail' type="text" />
                </div>
              </div>
              <div className='loginMidInputContainer'>
                <div className="loginInputContainerName">
                  <h6>EMAIL</h6>
                </div>
                <div className="iconinput">
                <CiMail className='mailIcon'/>
                <input onChange={(e)=>setEmail(e.target.value)} placeholder='Enter email...' className='loginInputEmail' type="email" />
                </div>
              </div>
              <div className='loginMidInputContainer'>
                <div className="loginInputContainerName">
                  <h6>PASSWORD</h6>
                </div>
                <div className="iconinput">
                <RiLockPasswordLine className='passwordIcon'/>
                <input onChange={(e)=>setPassword(e.target.value)} placeholder='Enter password...' className='loginInputEmail' type={hidden ? 'password' : 'text'} />
                <LuEyeOff onClick={()=>setHidden(!hidden)} className='passwordEyeIcon'/>
                </div>
              </div>
              <div className='loginMidInputContainer'>
                <div className="loginInputContainerName">
                  <h6>CONFIRM PASSWORD</h6>
                </div>
                <div className="iconinput">
                <RiLockPasswordLine className='passwordIcon'/>
                <input placeholder='Enter password...' className='loginInputEmail' type={hidden ? 'password' : 'text'} />
                <LuEyeOff onClick={()=>setHidden(!hidden)} className='passwordEyeIcon'/>
                </div>
              </div>
              <div className="loginButtonContainer">
                <button className='loginButton'>SIGN UP</button>
                
              </div>
            </form>
            <div className="loginBottom">
              <h5 className='loginBottomFirst'>Already have a account? </h5><Link to={'/'}><h5 className='loginBottomSecond'> Sign in</h5></Link>
            </div>
        </div>
    </div>
  )
}

export default Register