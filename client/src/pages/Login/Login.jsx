import React, { useContext, useState } from 'react'
import './login.css'
import { CiMail } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuEyeOff } from "react-icons/lu";
import { Link } from 'react-router-dom'
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import { SocketContext } from '../../context/SocketContext/SocketContext';
const Login = () => {

  const {user, isfetching, error, dispatch} = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [hidden, setHidden] = useState(true);
  const {setSocket} =useContext(SocketContext)
  const handleSubmit = (e)=>{
    e.preventDefault()
    loginCall({email:email,password:password},dispatch)
   
  }
  console.log(user);
  return (
    <div className='login'>
        <div className="loginContainer">
            <img className='loginimg' src="https://newprag.s3.amazonaws.com/UX_content/survey.png" alt="" />
            <form onSubmit={handleSubmit} className="loginmid">
              <h2 style={{paddingLeft:"8px"}}>Login</h2>
              <h5 style={{paddingLeft:"8px"}}>Please sign in to continue</h5>
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
              <div className="loginButtonContainer">
                <button type='submit' className='loginButton'>{isfetching ? <CircularProgress size="20px"/> :"LOGIN"}</button>
                <h6>Forgot password?</h6>
              </div>
            </form>
            <div className="loginBottom">
              <h5 className='loginBottomFirst'>Don't have an account? </h5><Link to={'/register'}><h5 className='loginBottomSecond'> Sign up</h5></Link>
            </div>
        </div>
    </div>
  )
}

export default Login