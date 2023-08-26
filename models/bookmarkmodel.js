const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const Bookmarkmodel = new mongoose.Schema(
  {

    title: {
      type: String,
      required: true,
      trim: true
    },
    arth: {
      type: String,
      required: true,
      trim: true
    },
    ang: {
      type: Number,
      required: true,
    },
    auther: {
      type: ObjectId,
      ref: "users"
    }
  },
  { timestamps: true }
)
module.exports = mongoose.model('arth', Bookmarkmodel)