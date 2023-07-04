"use strict";

const express = require( "express" );
const reservationController = require( "../../controllers/reservation.controller" );
const asyncHandler = require( "../../helpers/asyncHandler.js" );
const { authenticate, authorize } = require( "../../helpers/authenticate");
const router = express.Router();

router.get( "/", asyncHandler( reservationController.getAllReservations ) );
router.post( "/",authenticate, asyncHandler( reservationController.createReservation ) );
router.get( "/:reservationId", asyncHandler( reservationController.getReservation ) );
router.delete( "/", asyncHandler( reservationController.deleteReservation ) );
router.patch( "/:reservationId", asyncHandler( reservationController.updateReservation ) );
router.get( "/customer/:customerId", asyncHandler( reservationController.getReservationByCustomerId ) );
router.get( "/restaurant/:restaurantId", asyncHandler( reservationController.getReservationByRestaurantId ) );
router.get( "/table/:tableId", asyncHandler( reservationController.getReservationByTableId ) );
router.get( "/status/:status", asyncHandler( reservationController.getReservationByStatus ) );

module.exports = router;
