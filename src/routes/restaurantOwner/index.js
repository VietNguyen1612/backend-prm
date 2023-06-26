"use strict"
const express = require( "express" );
const restaurantOwnerController = require( "../../controllers/restaurantOwner.controller" );
const asyncHandler = require( "../../helpers/asyncHandler.js" );
const router = express.Router();
router.get( "/", asyncHandler( restaurantOwnerController.getAllRestaurantOwners ) );
router.post( "/", asyncHandler( restaurantOwnerController.createRestaurantOwner ) );
router.get( "/:restaurantOwnerId", asyncHandler( restaurantOwnerController.getRestaurantOwner ) );
router.delete( "/:restaurantOwnerId", asyncHandler( restaurantOwnerController.deleteRestaurantOwner ) );
router.patch( "/:restaurantOwnerId", asyncHandler( restaurantOwnerController.updateRestaurantOwner ) );
module.exports = router;