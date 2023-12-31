"use strict";

const express = require( "express" );
const { authenticate, authorize } = require( "../../helpers/authenticate" );

const restaurantController = require( "../../controllers/restaurant.controller" );

const asyncHandler = require( "../../helpers/asyncHandler.js" );
const feedbackController = require("../../controllers/feedback.controller");

const router = express.Router();

router.get( "/", asyncHandler( restaurantController.getAllRestaurants ) );
router.get( "/admin", authenticate, authorize( 'admin' ), asyncHandler( restaurantController.getAllRestaurantsForAdmin ));
router.post( "/", authenticate, authorize( 'restaurantOwner' ), asyncHandler( restaurantController.createRestaurant ) );
router.get( "/:restaurantId", asyncHandler( restaurantController.getRestaurant ) );
router.get( "/restaurantOwner/:restaurantOwnerId",authenticate,authorize('restaurantOwner'), asyncHandler( restaurantController.getRestaurantByRestaurantOwnerId ) );
router.delete(
    "/:restaurantId",
    asyncHandler( restaurantController.deleteRestaurant )
);
router.patch(
    "/:restaurantId",
    asyncHandler( restaurantController.updateRestaurant )
);
router.get (
    "/:restaurantId/feedbacks",
    asyncHandler( feedbackController.getFeedbackByRestaurantId )
)

module.exports = router;
