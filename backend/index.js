const express = require('express')

const app = express()
const userRoute = require('./Routes/Users')
const authRoute = require('./Routes/Auth')
const postRoute = require('./Routes/Posts')
const conversationRoute = require('./Routes/Conversations')
const messageRoute = require('./Routes/Messages')
const commentRoute = require('./Routes/Comments')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
console.log(process.env.MONGO_URL);
mongoose.connect(`${process.env.MONGO_URL}`).then(res=>console.log("Connected to mongoDB")).catch(err=>console.log(err))
app.use(cors())
app.use(express.json())

app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/posts',postRoute)
app.use('/api/conversations',conversationRoute)
app.use('/api/messages',messageRoute)
app.use('/api/comments',commentRoute)
app.listen(process.env.PORT || 8800,(req,res)=>{
    console.log("Server started");
})