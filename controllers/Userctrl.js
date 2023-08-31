const Usermodel = require("../models/Usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongoose").Types;
require("dotenv").config();
const CreateUser = async (req, res) => {
  try {
    const { fullName, address, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const Data = await Usermodel.create({
      fullName,
      address,
      email,
      password: hashPassword,
    });
    const { password: omit, ...responseData } = Data._doc;

    res
      .status(201)
      .send({ message: "user create successfully", data: responseData });
  } catch (err) {
    console.log(err);
  }
};
const Userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      res.status(400).send({ message: "please, provide email" });
    }
    if (!password) {
      res.status(400).send({ message: "Please, provide password" });
    }

    const Checkemail = await Usermodel.findOne({ email: email });
    if (!Checkemail) {
      res.status(404).send({ message: "email is not exist " });
    }

    const checkPasword = await bcrypt.compare(password, Checkemail.password);
    if (!checkPasword) {
      res.status(404).send({ message: "wrong password and try again" });
    }

    const token = jwt.sign(
      {
        id: Checkemail._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "120d" }
    );
    res.status(200).send({ message: "login successfully", token: token });
  } catch (err) {
    console.log("Error signing JWT token:", err);
    res.status(500).send({ message: "An error occurred during login" });
  }
};
const UpdateUser = async (req, res) => {
  try {
    const { fullName, address, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const Data = await Usermodel.findOneAndUpdate({
      fullName,
      address,
      email,
      password: hashPassword,
    });
    const { password: omit, ...responseData } = Data._doc;

    res
      .status(201)
      .send({ message: "user updated successfully", data: responseData });
  } catch (err) {
    console.log(err);
  }
};
const singleUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const UserData = await Usermodel.findById({ _id: new ObjectId(id) });
    console.log("data", UserData);
    res
      .status(200)
      .json({ message: "single customer details", data: UserData });
  } catch (error) {
    res.status(404).json({ message: "not found" });
    console.log(error);
  }
};
module.exports = { Userlogin, CreateUser, UpdateUser, singleUser };
