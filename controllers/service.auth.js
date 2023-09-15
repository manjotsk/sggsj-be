const PasswordReset = require("../models/PasswordReset");
const Usermodel = require("../models/Usermodel");

const { resetPasswordTemplate } = require('../tempate/resetPasswordTempate')
const forgetpassword = async (req, res, next) => {

  try {
    const { email } = req.body
    const findUser = await Usermodel.findOne({ email: email });
    if (!findUser) throw new HttpException(409, `This email ${email} was not found`);


    const checkTokenExistence = await passwordReset.findOne({ primaryEmail: primaryEmail });
    if (checkTokenExistence) {
      await this.passwordReset.deleteOne({ email: email });
    }

    const token = sign({ userId: findUser._id }, 'resetPassword', { expiresIn: '1h' });

    await this.passwordReset.create({
      userId: findUser._id,
      token,
      email: findUser.email,
      expireAt: new Date(Date.now() + 3600000),
    });

    await sendEmail([email], 'Shri Guru Granth Sahib', resetPasswordTemplate({ resestToken: token }), ['gurwinder.singh@simbaquartz.com']);
    return res.json({ message: "Token send successfuly", success: true })
  } catch (error) {
    next(error)
  }
}
const resetPassword = async (req, res, next) => {

  try {
    const resetToken = req.query.resestToken
    const { password, confirmPassword } = req.body
    const validationResult = validatePassword(password);
    if (validationResult !== 'valid') {
      throw new HttpException(401, `Invalid password ${validationResult}`);
    }
    const tokenEntry = await PasswordReset.findOne({ token: resetToken });

    if (!tokenEntry || tokenEntry.expiresAt < new Date()) {
      throw new HttpException(400, 'Invalid or expired token');
    }
    const findUser = await Usermodel.findOne({ _id: tokenEntry.userId });

    if (!findUser) {
      throw new HttpException(404, 'User not found');
    }
    if (password !== confirmPassword) {
      throw new HttpException(409, 'Password is not matching');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updateResult = await UsermodelupdateOne({ _id: findUser._id }, { $set: { password: hashedPassword } });
    await PasswordReset.findOneAndDelete({ token: resetToken });
    res.status(200).json({ data: updateResult, message: "Password Reset Successfuly", success: true })
  } catch (error) {
    next(error)
  }

}

function validatePassword(password) {
  if (typeof password !== 'string') return 'Invalid password format';
  if (password.length < 8 || password.length > 15) return 'Password length should be between 8 and 15 characters';

  const missingRules = [];

  let hasUppercase = false;
  let hasLowercase = false;
  let digitCount = 0;

  for (const char of password) {
    if (char >= 'A' && char <= 'Z') {
      hasUppercase = true;
    } else if (char >= 'a' && char <= 'z') {
      hasLowercase = true;
    } else if (char >= '0' && char <= '9') {
      digitCount++;
    } else if (char === ' ') {
      return 'Password should not contain spaces';
    }
  }

  if (!hasUppercase) {
    missingRules.push('uppercase letter');
  }

  if (!hasLowercase) {
    missingRules.push('lowercase letter');
  }

  if (digitCount < 2) {
    missingRules.push('at least two digits');
  }

  return missingRules.length > 0 ? `Password must contain ${missingRules.join(', ')}` : 'valid';
}


module.exports = { resetPassword, forgetpassword }