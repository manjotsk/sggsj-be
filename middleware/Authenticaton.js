const jwt = require("jsonwebtoken");
const { SecureKey } = require("../config/keys").secretkey;

const authenticateToken = async function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).send({ message: "Please provide a valid Bearer token." });
      return;
    }
    const token = authHeader.split(" ")[1];

    let decodedToken = jwt.verify(token, SecureKey, function (error, decoded) {
      if (error) {
        return "Token Expired";
      } else {
        tokenCheck = decoded;
      }
    });
    if (decodedToken === "Token Expired") {
      res.status(401).send({ status: false, data: "Token expired" });
    }
    req.token = tokenCheck;
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = { authenticateToken };
