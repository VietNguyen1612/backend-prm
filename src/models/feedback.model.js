const mongoose = require( 'mongoose' );

const DOCUMENT_NAME = 'Feedback';
const COLLECTION_NAME = 'feedbacks';

const feedbackSchema = new mongoose.Schema( {
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    reservationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation',
        required: true
    },
    content: {
        type: String,
        required: true
    },
}
    , {
        collection: COLLECTION_NAME,
        timestamps: true,
    }
);

module.exports = mongoose.model( DOCUMENT_NAME, feedbackSchema, COLLECTION_NAME );


