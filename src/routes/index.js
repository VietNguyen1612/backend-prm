"use strict";

const express = require( "express" );

const router = express.Router();

router.use( "/api/customer", require( "./customer" ) );
router.use( "/api/restaurant", require( "./restaurant" ) );
// router.use("/api/restaurantOwner", require("./restaurantOwner"));
router.use( "/api/account", require( "./account" ) );
router.use( "/api/table", require( "./table" ) );
module.exports = router;
