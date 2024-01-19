import mongoose from "mongoose";
import { Schema } from "mongoose";
const resetPassword = new Schema({
  userId: {
    type: String,
    required: true,
    ref: 'users'
  },
  email: {
    type: String,
    required: true,
    ref: 'users'
  },
  token: {
    type: String,
    required: true
  },
  expireAt: {
    type: Date
  }
});
export default mongoose.model("PasswordReset", resetPassword);