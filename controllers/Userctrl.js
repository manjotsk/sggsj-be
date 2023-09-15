const Usermodel = require("../models/Usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongoose").Types;
require("dotenv").config();

const CreateUser = async (req, res) => {
  try {
    const { fullName, address, dateofBirth, phone, email, password, } = req.body;
    const finduser = await Usermodel.findOne({email:email})
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    if (!finduser) {
      const Data = await Usermodel.create({
        fullName,
        address,
        phone, dateofBirth,
        email,
        password: hashPassword,
      });
      const { password: omit, ...responseData } = Data._doc;

      res.status(201).send({ status: true, message: "user create successfully", data: responseData });
    }
    else {
      res.status(400).send({ status: false, message: "User already exist" })
    }
  } catch (err) {
    console.log(err);
  }
};
const Userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
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
    {id: Checkemail._id},
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );
    res.status(200).send({ message: "login successfully", token: token });
  } catch (err) {
    console.log("Error signing JWT token:", err);
    res.status(500).send({ message: "An error occurred during login" });
  }
};
const UpdateUser = async (req, res) => {
  try {
    const { fullName, address, dateofBirth, phone, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const Data = await Usermodel.findOneAndUpdate({
      fullName,
      address,
      dateofBirth,
      phone,
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
const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const UserData = await Usermodel.findByIdAndDelete({ _id: new ObjectId(id) });
    res
      .status(200)
      .json({ message: "single customer details" });
  } catch (error) {
    res.status(404).json({ message: "not found" });
    console.log(error);
  }
};
module.exports = { Userlogin, CreateUser, UpdateUser, singleUser, DeleteUser };
