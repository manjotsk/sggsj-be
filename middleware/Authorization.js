const userModel = require("../models/Usermodel");
const bookmarkmodel = require("../models/bookmarkmodel");
const { ObjectId } = require("mongoose").Types;
const authorization = async (req, res, next) => {
    try {
        idFromToken = tokenCheck.id;

        const { loginUser, auther } = req.params.id;
        console.log(loginUser, "login user");
        const checkUser = await userModel.findOne({ _id: new ObjectId(loginUser) });
        const checkBookmark = await bookmarkmodel.findOne({ auther });

        if (!checkUser && !checkBookmark) {
            res.status(404).send({ message: "User not found" });
            return;
        }
        const userLogin = checkUser._id.toString();
        if (userLogin !== idFromToken) {
            res.status(403).send({ message: "Authorization failed" });
        } else {
            next();
        }

    } catch (err) {
        res.status(400).send({ status: false, message: err.message });
    }
}
module.exports = { authorization };