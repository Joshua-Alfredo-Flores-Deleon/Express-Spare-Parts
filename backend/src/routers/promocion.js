import express from "express";
import promocionController from "../controllers/promocionController.js";
import upload from "../utils/cloudinaryConfig.js";

const router = express.Router();

router
  .route("/")
  .get(promocionController.getPromociones)
  .post(upload.single("image"), promocionController.insertPromocion);

router
  .route("/:id")
  .put(upload.single("image"), promocionController.updatePromocion)
  .delete(promocionController.deletePromocion);

export default router;
