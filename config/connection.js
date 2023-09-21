const mongoose = require("mongoose");
require("dotenv").config();

const DB_CONNECT = process.env.DB_CONNECT;

const mongodb = (req, res) => {
  mongoose
    .connect(
      DB_CONNECT,
      {
        useNewUrlParser: true,
      }
    )
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
};

module.exports = { mongodb };
