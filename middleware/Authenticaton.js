const jwt = require("jsonwebtoken");
require('dotenv').config();

const authenticateToken = async function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).send({ message: "Please provide a valid Bearer token." });
      return;
    }
    const token = authHeader.split(" ")[1];
    console.log(token);

    let decodedToken = jwt.verify(
      token,
      process.env.SECRET_KEY,
      function (error, decoded) {
        if (error) {
          return "Token Expired"
        } else {
          tokenCheck = decoded;
        }
      });
    if (decodedToken === "Token Expired") {
      res.status(401).send({ status: false, data: "Token expired" })
    }
    req.token = tokenCheck
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = { authenticateToken };