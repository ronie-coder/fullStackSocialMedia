const express = require('express')

const router = express.Router()
const bcrypt = require('bcrypt')
const userModel = require('../Models/User')
//update user

router.put("/:id",async (req,res)=>{
    const data = req.body
    
        if(data.userId === req.params.id){
         if(data.password){
            try {
                const salt = await bcrypt.genSalt(10)
                data.password = await bcrypt.hash(data.password,salt)
            } catch (error) {

                return res.status(500).json(error)
                
            }
         }
         try {
            const user = await userModel.findByIdAndUpdate(data.userId,{$set:data})
            res.status(200).json("account updated")
         } catch (error) {
            res.status(404).json(error)
         }
        }else
        res.status(404).json("cant access")
        
    
        

})

//delete user
router.delete("/:id",async (req,res)=>{
    const data = req.body
    
        if(data.userId === req.params.id){
         
         try {
            await userModel.findByIdAndDelete(data.userId)
            res.status(200).json("account deleted")
         } catch (error) {
            res.status(404).json(error)
         }
        }else
        res.status(404).json("cant access")
        
    
        

})

//get a user
router.get("/:username",async (req,res)=>{
    try {
        const foundUser = await userModel.findOne({username:req.params.username})
        res.status(200).json(foundUser) 
    } catch (error) {
        res.status(500).json(error)
    }
})

//get a user by Id
router.get("/userId/getUser/:userId",async (req,res)=>{
    try {
        const foundUser = await userModel.findById(req.params.userId)
        res.status(200).json(foundUser) 
    } catch (error) {
        res.status(500).json(error)
    }
})

//follow a user

router.put("/:id/follow",async(req,res)=>{
    const owndata = req.body
    
    
        
        if(owndata.userId !== req.params.id){
            
       
            try {
                const own = await userModel.findById(owndata.userId)
                const userData = await userModel.findById(req.params.id)
               if(userData.followers.includes(own._id)){
                await userData.updateOne({$pull:{followers:own._id}})
                await userData.save();
                await own.updateOne({$pull:{following:userData._id}})
                await own.save()
                res.status(200).json("unfollowed")
               } else{
                await userData.updateOne({$push:{followers:own._id}})
                await userData.save();
                await own.updateOne({$push:{following:userData._id}})
                await own.save()
                res.status(200).json("followed")
               }
            } catch (error) {
                res.status(404).json(error)
            }
        
    
}else{
    res.status(403).json("You cannot follow your own account")
}
})



module.exports = router