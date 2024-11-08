const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    conversationId:{
        type:String,
    },
    sender:{
        type:String
    },
    text:{
        type:String,
        required:true
    },
    imgUrl:{
        type:String,
    }

},{timestamps:true})


module.exports = mongoose.model('Messages',messageSchema)