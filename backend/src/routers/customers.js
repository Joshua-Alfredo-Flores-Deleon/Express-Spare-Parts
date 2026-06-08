import express from "express";
import customerController from "../controllers/customerController.js";

const router = express.Router();

router.get("/count", customerController.countCustomers);

router
  .route("/")
  .get(customerController.getCustomers)
  .post(customerController.createCustomer);

router
  .route("/:id")
  .get(customerController.getCustomerById)
  .put(customerController.updateCustomer)
  .delete(customerController.deleteCustomer);

export default router;
