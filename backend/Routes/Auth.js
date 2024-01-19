const express = require('express')
const userModel = require('../Models/User')
const router = express.Router()
const bcrypt = require('bcrypt')
//register a new user
router.post("/",async (req,res)=>{
    const {username, email, password} = req.body
    
    try {
        const salt =await bcrypt.genSalt(10)
        const hashedpassword =await bcrypt.hash(password,salt)
        const newUser = await userModel.create({
            username:username,
            email:email,
            password:hashedpassword,
        })
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json(error)
        }
})

//login an existing user

router.post("/login",async(req,res)=>{
    const{email,password} = req.body
    try {
        const loggedInUser = await userModel.findOne({email:email})
        const validpassword = await bcrypt.compare(password,loggedInUser.password)
        if (validpassword){
            res.status(200).json(loggedInUser)
        }else
        res.status(404).json("Incorrect password")
    } catch (error) {
        res.status(500).json("Incorrect credentials")
    }
})


module.exports = router