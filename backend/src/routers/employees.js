import express from "express";
import employeerController from "../controllers/employeesController.js";

//usamos Router() de la libreria express para
//definir los métodos HTTP a utilizar
const router = express.Router();

router.route("/")
    .get(employeerController.getEmployeer);

router.route("/:id")
  .put(employeerController.updateEmployeer)
  .delete(employeerController.deleteEmployeer);

export default router;