"use strict";

const express = require("express");

const router = express.Router();

router.use("/api/customer", require("./customer"));
router.use("/api/restaurant", require("./restaurant"));
module.exports = router;
