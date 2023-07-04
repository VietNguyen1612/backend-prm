const FeedbackService = require( '../services/feedback.service' );

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
            res.send( feedback );
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
            res.send( feedback );
        } catch ( error ) {
            next( error );
        }
    }
}

module.exports = new feedback();