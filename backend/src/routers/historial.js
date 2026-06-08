import express from "express";
import historialController from "../controllers/historialController.js";

const router = express.Router();

// GET /api/historial/customer/:id_cliente — historial de un cliente específico
router.get("/customer/:id_cliente", historialController.getHistorialByCustomer);

// POST /api/historial/price-range — rango de precios
router.post("/price-range", historialController.getHistoralByPriceRange);

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
