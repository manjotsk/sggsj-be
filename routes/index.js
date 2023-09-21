const express = require("express");
const router = express.Router();
const { resetPassword, forgetpassword } = require("../controllers/service.auth");
const Userctrl = require("../controllers/Userctrl");
const Bookmark = require("../controllers/Bookmark");
const { CreateBookmark, GetBookmark } = require("../controllers/Bookmark");
const { authenticateToken } = require("../middleware/Authenticaton");
const { authorization } = require("../middleware/Authorization");
const { getObjectId } = require("../controllers/me.auth");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/registration", Userctrl.CreateUser);
router.post("/login", Userctrl.Userlogin);
router.post("/edit/:id", authenticateToken, authorization, Userctrl.UpdateUser)
router.get("/profile", authenticateToken, getObjectId)
// router.patch("/forget-password", forgetpassword)
// router.patch("/auth/reset-password", resetPassword)

router.post("/bookmark", authenticateToken, CreateBookmark);
router.get("/bookmark", authenticateToken, GetBookmark);
router.delete("/bookmark/:id", Bookmark.Delete);

module.exports = router;
