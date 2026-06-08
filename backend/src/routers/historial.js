import express from "express";
import historialController from "../controllers/historialController.js";

//Router() nos ayuda a colocar los métodos
// que tendrá el endpoint
const router = express.Router();

router.route("/")
.get(historialController.getHistorial)
.post(historialController.insertHistorial);

router.route("/price-range")
.post(historialController.getHistoralByPriceRange);

router.route("/:id")
.put(historialController.updateHistorial) 
.delete(historialController.deleteHistorial)
.get(historialController.getHistorialById);


export default router;