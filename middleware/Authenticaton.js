const jwt = require("jsonwebtoken")
const BookmarkModel = require("../models/bookmarkmodel");
const {ObjectId} = require("mongoose").Types;
require('dotenv').config();

const authenticate = async function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).send({ message: "Please provide a valid Bearer token." });
            return;
        }

        const token = authHeader.split(" ")[1];

        jwt.verify(
            token,
            process.env.SECRET_KEY,
            function (error, decoded) {
                if (error) {
                    res.status(401).send({ message: "Unauthorized. Invalid token." });
                } else {
                    req.token = decoded;
                    next();
                }
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal server error." });
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
