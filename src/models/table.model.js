const mongoose = require( 'mongoose' );

const DOCUMENT_NAME = 'Table';
const COLLECTION_NAME = 'tables';

const tableSchema = new mongoose.Schema( {
    tableNumber: {
        type: Number,
        required: true,
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    reservationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation'
    },
    area: {
        type: String,
        required: true,
        enum: ['bên trong', 'bên ngoài','khu vực khác']
    },
}
    , {
        collection: COLLECTION_NAME,
        timestamps: true,
    }
);

module.exports = mongoose.model( DOCUMENT_NAME, tableSchema, COLLECTION_NAME );
