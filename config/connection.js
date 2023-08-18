const mongoose = require("mongoose");
require("dotenv").config();
const DB_CONNECT = process.env.DB_CONNECT;

const mongodb = (req, res) => {
  mongoose
    .connect(
       DB_CONNECT,
      // "mongodb://127.0.0.1:27017/user",
      {
        useNewurlParser: true,
      }
    )
    .then(() => console.log("Mongodb is connected"))
    .catch((err) => console.log(err));
};
module.exports = { mongodb };
