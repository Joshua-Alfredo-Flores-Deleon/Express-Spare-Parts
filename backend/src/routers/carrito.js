import express from "express";
import carritoController from "../controllers/carritoController.js";
import upload from "../utils/cloudinaryConfig.js";

const router = express.Router();

router
  .route("/")
  .get(carritoController.getAllCarritos)
  .post(upload.single("image"), carritoController.insertCarrito);

router
  .route("/:id")
  .put(upload.single("image"), carritoController.updateCarrito)
  .delete(carritoController.deleteCarrito);

export default router;