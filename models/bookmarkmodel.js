import { Types } from 'mongoose';

const { ObjectId } = Types;

import mongoose from "mongoose";
const Bookmarkmodel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  engAkhar: {
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
    required: true
  },
  lineno: {
    type: Number,
    required: true
  },
  english: {
    type: String
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
}, {
  timestamps: true
});
export default mongoose.model("arth", Bookmarkmodel);