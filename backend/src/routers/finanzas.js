import express from "express";
import finanzaController from "../controllers/finanzaController.js";

const router = express.Router();

router
  .route("/")
  .get(finanzaController.getFinanza)
  .post(finanzaController.insertFinanza);

router
  .route("/:id")
  .put(finanzaController.updateFinanza)
  .delete(finanzaController.deleteFinanza);

export default router;