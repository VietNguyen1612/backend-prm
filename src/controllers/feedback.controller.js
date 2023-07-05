const FeedbackService = require( '../services/feedback.service' );
const reservationService = require('../services/reservation.service');

class feedback {
    getFeedbackFromReservationId = async ( req, res, next ) => {
        try {
            const feedback = await FeedbackService.findFeedbackByReservationId( req.params.reservationId );
            res.send( feedback );
        } catch ( error ) {
            next( error );
        }
    }
    createFeedback = async ( req, res, next ) => {
        try {
            const customerId = req.user.customer;
            const reservationId = req.params.reservationId;
            const feedback = await FeedbackService.create( { ...req.body, customerId, reservationId } );
            await reservationService.update( reservationId, { status: 'completed', feedback: feedback._id } )
            res.send(feedback);
        } catch ( error ) {
            next( error );
        }
    }
    updateFeedback = async ( req, res, next ) => {
        try {
            const feedback = await FeedbackService.update( req.params.feedbackId, req.body );
            res.send( feedback );
        } catch ( error ) {
            next( error );
        }
    }
    deleteFeedback = async ( req, res, next ) => {
        try {
            const feedback = await FeedbackService.delete( req.params.feedbackId );
            await reservationService.update( req.params.reservationId, {$pull: {feedback: req.params.feedback} } )
            res.send( feedback );
        } catch ( error ) {
            next( error );
        }
    }
}

module.exports = new feedback();