import mongoose from "mongoose";

import keys from "../config/keys.js";


const { DB_CONNECT } = keys.host;
const mongodb = (req, res) => {
  const db = mongoose.connect(DB_CONNECT, {
    useNewUrlParser: true
  }).then(() => {console.log("MongoDB is connected"); mongoose.set('debug',true)}).catch(err => console.error("MongoDB connection error:", err));
};

export  {
  mongodb
};