"use strict";

const express = require( "express" );
const { authenticate, authorize } = require( "../../helpers/authenticate" );

const restaurantController = require( "../../controllers/restaurant.controller" );

const asyncHandler = require( "../../helpers/asyncHandler.js" );

const router = express.Router();

router.get( "/", asyncHandler( restaurantController.getAllRestaurants ) );
router.post( "/", authenticate, authorize( 'restaurantOwner' ), asyncHandler( restaurantController.createRestaurant ) );
router.get( "/:restaurantId", asyncHandler( restaurantController.getRestaurant ) );
router.delete(
    "/:restaurantId",
    asyncHandler( restaurantController.deleteRestaurant )
);
router.patch(
    "/:restaurantId",
    asyncHandler( restaurantController.updateRestaurant )
);

module.exports = router;
