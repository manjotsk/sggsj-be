import mongoose from "mongoose";
import { Schema } from "mongoose";
const verification = new Schema({
  userId: {
    type: String,
    required: true,
    ref: 'users'
  },
  uniqueString: {
    type: String
  },
  createdAt: {
    type: Date
  },
  expireAt: {
    type: Date
  }
});
export default mongoose.model("emailVeification", verification);