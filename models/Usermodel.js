const mongoose = require("mongoose");

const Usermodel = new mongoose.Schema(
  {
  
  fullName:{
    type:String,
    required: true,
    trim:true
  },
 address:{
    type: String,
    required:true,
    trim:true
 },
  email:{
    type: String,
    required: true,
    unique: true,
    trim : true,
    lowercase: true
  },
  password:{
    type: String,
    requird:true
  },
},

{timeStamp: true}
)
module.exports = mongoose.model("User",Usermodel)

