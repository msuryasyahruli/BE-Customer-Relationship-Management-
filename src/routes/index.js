const express = require("express");
const router = express.Router();
const usersRouter = require("./users");
const serviceRouter = require("./service");
const customerRouter = require("./customer");

router.use("/users", usersRouter);
router.use("/service", serviceRouter);
router.use("/customer", customerRouter);

module.exports = router;
