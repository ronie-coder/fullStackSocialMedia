const express = require('express')

const router = express.Router()
const commentModel = require('../Models/Comment')

//post comment on a particular post

router.post('/',async(req,res)=>{
    const newComment =new commentModel(req.body)
    try {
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get all comments for a post

router.get('/:postId',async(req,res)=>{
    try {
        const allComments = await commentModel.find({postId:req.params.postId})
        res.status(200).json(allComments)
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router