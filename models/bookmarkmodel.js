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
},
{timestamps: true}
)
module.exports = mongoose.model('Arth', Bookmarkmodel)