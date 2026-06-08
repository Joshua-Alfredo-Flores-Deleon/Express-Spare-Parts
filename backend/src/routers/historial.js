import express from "express";
import historialController from "../controllers/historialController.js";

const router = express.Router();

router.get("/customer/:id_cliente", historialController.getHistorialByCustomer);


router
  .route("/")
  .get(historialController.getHistorial)
  .post(historialController.createHistorial);

router
  .route("/:id")
  .get(historialController.getHistorialById)
  .put(historialController.updateHistorial)
  .delete(historialController.deleteHistorial);

export default router;
