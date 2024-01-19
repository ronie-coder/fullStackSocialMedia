const express = require('express')

const router = express.Router()
const messageModel = require('../Models/Message')

//send message
router.post('/',async(req,res)=>{
    const newMessage =new messageModel(req.body)
    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get all messages
router.get('/:conversationId',async(req, res)=>{
    try {
        const message =await messageModel.find({conversationId:req.params.conversationId})
        res.status(200).json(message)
    } catch (error) {
        res.status(500).json(error)
    }
   
    
})




module.exports = router

