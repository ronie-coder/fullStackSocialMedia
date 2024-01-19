const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
    },
    profilePicture:{
        type:String,
    },
    coverPicture:{
        type:String,
    },
    city:{
        type:String,
    },
    from:{
        type:String,
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    desc:{
        type:String
    }
},{timestamps:true})


module.exports = mongoose.model("user",userSchema)

