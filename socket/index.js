const io = require('socket.io')(process.env.PORT || 8900,{
    cors:{
        origin: "http://localhost:5173",
    }
})

let users = []


const addUser = (userId, socketId)=>{
    !users.some(user=>user.userId === userId) &&
    users.push({userId,socketId})
}

const removeUser = (socketId)=>{
    users = users.filter(user=> user.socketId !== socketId);
}

const getUser = (userId)=>{
    return users.find((user) => user.userId === userId)
}

io.on('connection', (socket) => {
    console.log('a user connected');
    
    // taken and store userId and socketId from user
    socket.on("addUser",userId =>{
        addUser(userId,socket.id)
        io.emit("getUsers",users)
    })

    socket.on("AllOnlineUsers",res=>{
        io.emit("getAllOnlineUsers",users)
    })

    //send and get message

    socket.on("sendMessage",({senderId,recieverId,text})=>{
        const user = getUser(recieverId)
        console.log("sending msg");
        io.to(user.socketId).emit("getMessage",{
            senderId:senderId,
            text:text
        })
    })
    socket.on('logoutUser',({socketId})=>{
        removeUser(socketId),
        io.emit("getUsers",users)
    })
    socket.on('disconnect',()=>{
        console.log("disconnected",socket.id);
        removeUser(socket.id)
        io.emit("getUsers",users)
    })
  });