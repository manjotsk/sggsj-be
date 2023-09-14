const jwt = require("jsonwebtoken");
require('dotenv').config();

const authenticateToken = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    // authorization && token
    if (!token) {
      res.send({ message: "please login first && please try after sometime" });
    }

    let decodedToken = jwt.verify(
      token,
      process.env.SECRET_KEY,
      function (error, decoded) {
        if (error) {
          res.status(400).send({ message: error.message });
        } else {
          tokenCheck = decoded;
        }
      }
    );
    req.token = tokenCheck
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = { authenticateToken };