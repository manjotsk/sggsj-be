const express = require("express");
const router = express.Router();
const Userctrl = require("../controllers/Userctrl");
const Bookmark = require("../controllers/Bookmark");
const { CreateBookmark, GetBookmark } = require("../controllers/Bookmark");
const { authenticate} = require("../middleware/Authenticaton");
const { authorization } = require("../middleware/Authorization");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/registration", Userctrl.CreateUser);
router.post("/login", Userctrl.Userlogin);
router.get("/singleuser/:id", authenticate,  Userctrl.singleUser);

router.post("/bookmark/", authenticate, CreateBookmark);
router.get("/bookmark/", authenticate, GetBookmark);
router.delete("/bookmark/:id", Bookmark.Delete);
router.get("/hello", (req, res) => res.send("Hello World"));

module.exports = router;
