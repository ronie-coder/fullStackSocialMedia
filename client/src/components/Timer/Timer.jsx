import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Timer = () => {
    let[second, setSecond] = useState(0)
    let[minute, setMinute] = useState(0)
    const navigate = useNavigate()
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            if(minute === 1){
                navigate(-1)
            }
          if (second === 59) {
            setMinute(minute + 1)
            setSecond(0)
          } else {
            setSecond(second + 1)
          }
        }, 1000)
    
        return () => clearInterval(intervalId)
      }, [second, minute])
  return (
    <div>{`${minute < 10 ? '0'+minute : minute}:${second < 10 ? '0'+second : second}`}</div>
  )
}

export default Timer