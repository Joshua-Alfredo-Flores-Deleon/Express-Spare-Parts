import express from "express";
import finanzaController from "../controllers/finanzaController.js";
import upload from "../utils/cloudinaryConfig.js";

const router = express.Router();

router
  .route("/")
  .get(finanzaController.getAllFinanzas)
  .post(upload.single("image"), finanzaController.insertFinanza);

router
  .route("/:id")
  .put(upload.single("image"), finanzaController.updateFinanza)
  .delete(finanzaController.deleteFinanza);

export default router;