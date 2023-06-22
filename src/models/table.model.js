const mongoose = require( 'mongoose' );

const DOCUMENT_NAME = 'Table';
const COLLECTION_NAME = 'tables';

const tableSchema = new mongoose.Schema( {
    tableNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    status: {
        type: String,
        enum: [ 'available', 'unavailable', 'reserved' ],
        default: 'available'
    },
    reservationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation'
    },
    area: {
        type: String,
    },
}
    , {
        collection: COLLECTION_NAME,
        timestamps: true,
    }
);

module.exports = mongoose.model( DOCUMENT_NAME, tableSchema, COLLECTION_NAME );
