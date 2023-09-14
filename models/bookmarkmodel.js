const { ObjectId } = require("mongoose").Types;
const mongoose = require("mongoose");

const Bookmarkmodel = new mongoose.Schema(
  {

    title: {
      type: String,
      required: true,
      trim: true,
      unique: true
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
    lineno: {
      type: Number,
      required: true,
    },
    english: {
      type: String,
    },
    hindi: {
      type: String,
      required: true,
      trim: true
    },
    userId: {
      type: ObjectId,
      required: true,
      ref: "User"
    }
  },
  { timestamps: true }
)
module.exports = mongoose.model('arth', Bookmarkmodel)