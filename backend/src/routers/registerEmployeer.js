import express from "express";
import registerEmployeerController from "../controllers/registerEmployeerController.js";

const router = express.Router();

router.route("/").post(registerEmployeerController.register);
router.route("/verifyCodeEmail").post(registerEmployeerController.verifyCode);

export default router;