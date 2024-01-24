import mongoose from "mongoose";
const validateEmail = function (email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};
const Usermodel = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  avtar: {
    type: String
  },
  dob: {
    type: String
  },
  phone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    validate: [validateEmail, "Please enter a valid email"],
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    requird: true,
    trim: true,
    minLength: 8,
    description: "must be a string of at least 8 characters, and is required"
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timeStamp: true
});
export default mongoose.model("User", Usermodel);