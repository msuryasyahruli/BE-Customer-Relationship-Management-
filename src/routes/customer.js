const express = require("express");
const router = express.Router();
const customersController = require("../controller/customer");

router
  .get("/", customersController.getAllServices)
  .get("/:id", customersController.getDetailCustomer)
  .post("/", customersController.createCustomer)
  .put("/:id", customersController.updateCustomer)
  .delete("/:id", customersController.deleteCustomer);

module.exports = router;
