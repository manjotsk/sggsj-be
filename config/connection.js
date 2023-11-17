const mongoose = require("mongoose");

const { DB_CONNECT } = require("./keys").host;

const mongodb = (req, res) => {
  mongoose
    .connect(DB_CONNECT, {
      useNewUrlParser: true,
    })
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
};

module.exports = { mongodb };
