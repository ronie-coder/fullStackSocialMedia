import { createContext, useState } from "react";


export const SocketContext = createContext()

const SocketContextProvider = ({children}) =>{
    const [socket, setSocket] = useState(null)
    const [onlineUsers,setOnlineUsers] = useState(null)
    return(
        <SocketContext.Provider value={{socket,setSocket,onlineUsers,setOnlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}
export default SocketContextProvider