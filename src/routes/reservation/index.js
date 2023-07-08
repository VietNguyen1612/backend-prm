"use strict";

const express = require( "express" );
const reservationController = require( "../../controllers/reservation.controller" );
const asyncHandler = require( "../../helpers/asyncHandler.js" );
const feedbackController = require( "../../controllers/feedback.controller" );
const { authenticate, authorize } = require( "../../helpers/authenticate");
const router = express.Router();

router.get( "/", asyncHandler( reservationController.getAllReservations ) );
router.post( "/",authenticate, asyncHandler( reservationController.createReservation ) );
router.get( "/:reservationId", asyncHandler( reservationController.getReservation ) );
router.delete( "/", asyncHandler( reservationController.deleteReservation ) );
router.patch( "/:reservationId", asyncHandler( reservationController.updateReservation ) );
router.get( "/customer/:customerId", asyncHandler( reservationController.getReservationByCustomerId ) );
router.get( "/restaurant/:restaurantId", asyncHandler( reservationController.getReservationByRestaurantId ) );
router.get("/restaurantOwner/:restaurantOwnerId", asyncHandler(reservationController.getReservationByRestaurantOwnerId));
router.get( "/table/:tableId", asyncHandler( reservationController.getReservationByTableId ) );
router.get( "/status/:status", asyncHandler( reservationController.getReservationByStatus ) );
router.post( "/:reservationId/feedback",authenticate, asyncHandler( feedbackController.createFeedback ) );
router.get( "/:reservationId/feedback",authenticate, asyncHandler( feedbackController.getFeedbackFromReservationId ) );
router.patch( "/:reservationId/feedback/:feedbackId",authenticate, asyncHandler( feedbackController.updateFeedback ) );
router.delete( "/:reservationId/feedback/:feedbackId",authenticate, asyncHandler( feedbackController.deleteFeedback ) );

router.get( "/feedback/admin", authenticate, /*authorize( 'admin' ),*/ asyncHandler(feedbackController.getAllFeedbacks ) );
module.exports = router;
