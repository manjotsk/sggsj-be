const jwt = require("jsonwebtoken")
const BookmarkModel = require("../models/bookmarkmodel");
const {ObjectId} = require("mongoose").Types;
require('dotenv').config();

const authenticate = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        // authorization && token
        if (!token) {
            res.send({ message: "please login first && please try after sometime" });
        }

        jwt.verify(
            token,
            process.env.SECRET_KEY, // Fix the typo here
            function (error, decoded) {
                if (error) {
                    res.send({ message: error.message });
                } else {
                    tokenCheck = decoded;
                    req.token = tokenCheck;
                    next();
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
};

const authorization = async (req, res, next) => {
    try {
      idFromToken = tokenCheck.id;

     // console.log("idFromToken", idFromToken);
      const loginUser = req.params.id
      const checkUser = await BookmarkModel.findById({_id: new ObjectId(loginUser)})
      if(!checkUser){
        res.status(404).send({message: "User not found"})
      }
      //console.log("check Customer", checkUser)
      const userlogin = checkUser._id.toString();
      if(userlogin !== idFromToken)
      {
        res.status(403).send({message:"Authorization failed"})
      } else{
        next();
      }
     // console.log(userlogin,"Customer")

    }catch(err){
        res.status(400).send({ status: false, message: err.message });
    }
}

module.exports = {authenticate, authorization}
