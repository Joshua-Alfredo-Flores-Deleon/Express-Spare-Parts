import express from "express";
import ventaController from "../controllers/ventaController.js";
import upload from "../utils/cloudinaryConfig.js";

const router = express.Router();

router
  .route("/")
  .get(ventaController.getAllVentas)
  .post(upload.single("image"), ventaController.insertVenta);

router
  .route("/:id")
  .put(upload.single("image"), ventaController.updateVenta)
  .delete(ventaController.deleteVenta);

export default router;