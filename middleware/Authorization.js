const BookmarkModel = require("../models/bookmarkmodel");
const { ObjectId } = require("mongoose").Types;
const authorization = async (req, res, next) => {
    try {
        idFromToken = tokenCheck.id;
        
        const loginUser = req.params.id;
        console.log(loginUser,"login user");
        const checkUser = await BookmarkModel.findby({
          _id: new ObjectId(loginUser)
        });
        console.log("check User", checkUser);
    
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
module.exports = { authorization};