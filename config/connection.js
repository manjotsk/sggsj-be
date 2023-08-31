const { config } = require("dotenv");
const mongoose = require("mongoose");
require("dotenv").config();



config({path:`.env.${process.env.NODE_ENV}`})


 const CREDENTIAlS=process.env.CREDENTIAlS ==='true';



const {NODE_ENV,PORT,AWS_SES_ACCESS_KEY_ID,AWS_SES_SECRET_ACCESS_KEY_ID,AWS_REGION}=process.env

const DB_CONNECT = process.env.DB_CONNECT;

const mongodb = (req, res) => {
  mongoose
    .connect(
      DB_CONNECT,
      {
        useNewurlParser: true,
      }
    )
    .then(() => console.log("Mongodb is connected"))
    .catch((err) => console.log(err));
};
module.exports = { mongodb ,CREDENTIAlS};