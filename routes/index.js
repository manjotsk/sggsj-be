const express = require("express");
const router = express.Router();
const { resetPassword, forgetpassword } = require("../controllers/service.auth");
const Userctrl = require("../controllers/Userctrl")
const Bookmark = require("../controllers/Bookmark");
const { CreateBookmark, GetBookmark } = require("../controllers/Bookmark");
const { authenticate } = require("../middleware/Authenticaton");
const { authorization } = require("../middleware/Authorization");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/registration", Userctrl.CreateUser);
router.post("/login", Userctrl.Userlogin);
router.get("/singleuser/:id", authenticate, authorization, Userctrl.singleUser);
router.patch("/forget-password", forgetpassword)
router.patch("/reset-password", resetPassword)

router.post("/bookmark/", authenticate, CreateBookmark);
router.get("/bookmark/", authenticate, GetBookmark);
router.delete("/bookmark/:id", Bookmark.Delete);

module.exports = router;
