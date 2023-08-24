const mongoose = require("mongoose");

const Bookmarkmodel = new mongoose.Schema(
  {
  
  title:{
    type:String,
    required: true,
    trim:true
  },
 arth:{
    type: String,
    required:true,
    trim:true
 },
 ang:{
  type: Number,
  required:true,
 }
},
{timestamps: true}
)
module.exports = mongoose.model('arth', Bookmarkmodel)