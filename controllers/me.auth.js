const user = require("../models/Usermodel");

const getObjectId = async (req, res, next) => {
  try {
    const userId = req.token.id;
    console.log(userId);
    const findUSer = await user.findOne({ _id: userId });
    if (!findUSer) throw new Error("User not found");
    res
      .status(201)
      .send({ status: true, message: "Login user Data", data: findUSer });
  } catch (err) {
    next(err);
  }
};
module.exports = { getObjectId };
