// const PasswordReset = require("../models/PasswordReset");
// const Usermodel = require("../models/Usermodel");
// const jwt = require('jsonwebtoken');
// const bcrypt = require("bcryptjs");

// const { resetPasswordTemplate } = require('../tempate/resetPasswordTempate');
// const { sendEmail } = require("../service/sendEmail");
// const forgetpassword = async (req, res, next) => {
//   try {
//     const { email } = req.body;
//     const findUser = await Usermodel.findOne({ email });

//     if (!findUser) {
//       return res.status(404).json({ message: `User with email ${email} not found` });
//     }
//     const checkTokenExistence = await PasswordReset.findOne({ email: email });
//     console.log(checkTokenExistence, "email")
//     if (checkTokenExistence) {
//       await PasswordReset.deleteOne({ email: email });
//     }
//     const token = jwt.sign({ userId: findUser._id }, 'resetPassword', { expiresIn: '1h' });
//     console.log("Token", token);
//     await PasswordReset.create({
//       userId: findUser._id,
//       token,
//       email: findUser.email,
//       expireAt: new Date(Date.now() + 3600000),
//     });
//     await sendEmail([email], 'Shri Guru Granth Sahib', resetPasswordTemplate({ resetToken: token }), ['gurwinder.singh@simbaquartz.com']);
//     return res.json({ message: "Token sent successfully", success: true });
//   } catch (error) {
//     console.error('Error:', error);
//     return res.status(500).json({ message: 'Error initiating password reset' });
//   }
// };

// const resetPassword = async (req, res, next) => {

//   try {
//     const resetToken = req.query.token
//     const { password, confirmPassword } = req.body
//     const validationResult = validatePassword(password);
//     if (validationResult !== 'valid') {
//       throw new Error(`Invalid password ${validationResult}`);
//     }

//     const tokenEntry = await PasswordReset.findOne({ token: resetToken });
//     if (!tokenEntry) {
//       throw new Error('Token not found');
//     } else if (tokenEntry.expiresAt < new Date()) {
//       throw new Error('Token has expired');
//     }

//     const findUser = await Usermodel.findOne({ _id: tokenEntry.userId });
//     if (!findUser) {
//       throw new Error('User not found');
//     }
//     if (password !== confirmPassword) {
//       throw new Error('Password is not matching');
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const updateResult = await Usermodel.updateOne({ _id: findUser._id }, { $set: { password: hashedPassword } });
//     await PasswordReset.findOneAndDelete({ token: resetToken });
//     res.status(200).json({ data: updateResult, message: "Password Reset Successfuly", success: true })
//   } catch (error) {
//     next(error)
//   }

// }

// function validatePassword(password) {
//   if (typeof password !== 'string') return 'Invalid password format';
//   if (password.length < 8 || password.length > 15) return 'Password length should be between 8 and 15 characters';

//   const missingRules = [];

//   let hasUppercase = false;
//   let hasLowercase = false;
//   let digitCount = 0;

//   for (const char of password) {
//     if (char >= 'A' && char <= 'Z') {
//       hasUppercase = true;
//     } else if (char >= 'a' && char <= 'z') {
//       hasLowercase = true;
//     } else if (char >= '0' && char <= '9') {
//       digitCount++;
//     } else if (char === ' ') {
//       return 'Password should not contain spaces';
//     }
//   }

//   if (!hasUppercase) {
//     missingRules.push('uppercase letter');
//   }

//   if (!hasLowercase) {
//     missingRules.push('lowercase letter');
//   }

//   if (digitCount < 2) {
//     missingRules.push('at least two digits');
//   }

//   return missingRules.length > 0 ? `Password must contain ${missingRules.join(', ')}` : 'valid';
// }

// module.exports = { resetPassword, forgetpassword }