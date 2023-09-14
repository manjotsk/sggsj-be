const userModel = require("../models/Usermodel");
const { ObjectId } = require("mongoose").Types;
const authorization = async (req, res, next) => {
    try {
        idFromToken = tokenCheck.id;
        const loginUser = req.params.id;
        const checkUser = await userModel.findById({
            _id: new ObjectId(loginUser)
        });

        if (!checkUser) {
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