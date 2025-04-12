const express = require("express");
const router = express.Router();
const servicesController = require("../controller/service");

router
  .get("/", servicesController.getAllServices)
  .get("/:id", servicesController.getDetailService)
  .post("/", servicesController.createService)
  .put("/:id", servicesController.updateService)
  .delete("/:id", servicesController.deleteService);

module.exports = router;
