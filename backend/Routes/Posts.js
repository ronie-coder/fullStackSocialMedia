const express = require('express')

const router = express.Router()

const postModel = require('../Models/Post')
const userModel = require('../Models/User')



//create a post

router.post('/',async (req,res)=>{
    const newpost = new postModel(req.body)
    try {
        const savedPost = await newpost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

//update a post

router.put('/:id',async (req,res)=>{
    try {
        const findPost = await postModel.findById(req.params.id)
    if(findPost.userId === req.body.userId){
        
            await findPost.updateOne({$set:req.body})
            await findPost.save()
            res.status(200).json("Updated successfully")
        } else {
            res.status(403).json("cannot access")
        }
            
    } catch (error) {
        res.status(500).json(error)
    }
    
})

//delete a post

router.delete('/:id',async (req,res)=>{
    try {
        const findPost = await postModel.findById(req.params.id)
    if(findPost.userId === req.body.userId){
        
            await findPost.deleteOne()
           
            res.status(200).json("Deleted successfully")
        } else {
            res.status(403).json("cannot access")
        }
            
    } catch (error) {
        res.status(500).json(error)
    }
})

//like a post 

router.put("/:id/like",async (req,res)=>{
    try {
        const findPost = await postModel.findById(req.params.id)
        if(findPost.likes.includes(req.body.userId)){
            await findPost.updateOne({$pull:{likes:req.body.userId}})
            await findPost.save()
            res.status(200).json("unliked the post")
        }else{
            await findPost.updateOne({$push:{likes:req.body.userId}})
            await findPost.save()
            res.status(200).json("liked the post")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//get a post

router.get('/:id',async (req,res)=>{
    try {
        const findPost = await postModel.findById(req.params.id)
        res.status(200).json(findPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get all user posts

router.get('/:userId/posts',async(req,res)=>{
    try {
        const userPosts = await postModel.find({userId:req.params.userId})
        res.status(200).json(userPosts)
    } catch (error) {
       res.status(500).json(error) 
    }
})

//get all posts

router.get('/:userId/timeline/all',async (req,res)=>{
    try {
        const currentUser = await userModel.findById(req.params.userId)
        const userposts = await postModel.find({userId:currentUser._id})
        const friendposts = await Promise.all(
            currentUser.following.map(friendId=>{
               return postModel.find({userId:friendId});
            })
        )
        res.status(200).json(userposts.concat(...friendposts))
    } catch (error) {
        res.status(500).json(error)
    }
})

//get user from post

router.get("/post/owner/:postId", async (req, res)=>{
    try {
        const post = await postModel.findById(req.params.postId)
        const ownerOfPost = await userModel.findById(post.userId)
        res.status(200).json(ownerOfPost)
    } catch (error) {
        res.status(500).json(error)
    }
})
   
        

module.exports = router