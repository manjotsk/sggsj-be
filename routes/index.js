import express from "express";
import { CreateBookmark, GetBookmark,Delete } from "../controllers/Bookmark.js";
import Userctrl from "../controllers/Userctrl.js";
import {searchKoshController} from "../controllers/guruKosh.js";
import { getObjectId } from "../controllers/me.auth.js";
import { forgetpassword, resetPassword } from "../controllers/service.auth.js";
import { authenticateToken } from "../middleware/Authenticaton.js";
import Lines from '../models/lines.js'

const router = express.Router();
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Exprdess"
  });
});
router.post("/registration", Userctrl.CreateUser);
router.post("/login", Userctrl.Userlogin);
router.put("/edit", authenticateToken, Userctrl.UpdateUser);
router.get("/profile", authenticateToken, getObjectId);
router.patch("/forget-password", forgetpassword);
router.patch("/auth/reset-password", resetPassword);
router.post("/bookmark", authenticateToken, CreateBookmark);
router.get("/bookmark", authenticateToken, GetBookmark);
router.delete("/bookmark/:id", Delete);
router.get("/ang/:id", async (req,res)=>{
  const lines = await Lines.find({
    pageNo:req.params.id||1
  })
  console.log({lines});
  res.send({lines,pageNo:req.params.id})
});
router.post("/guru-kosh", searchKoshController);
export default router;