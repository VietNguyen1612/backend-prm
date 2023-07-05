const mongoose = require( 'mongoose' );

const DOCUMENT_NAME = 'Reservation';
const COLLECTION_NAME = 'reservations';
const reservationSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true
        },
        table: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Table',
            required: true
        },
        restaurant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Restaurant',
            required: true
        },
        arrivedDate: {
            type: Date,
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: [ 'confirm', 'pending', 'cancelled' ],
            required: true,
            default: 'pending'
        },
        guessNum: {
            type: Number,
            required: true
        },
        note: {
            type: String,
            required: false
        },
        feedback:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Feedback',
                
            }
        ]
    },
    {
        collection: COLLECTION_NAME,
        timestamps: true,
    }
);

module.exports = mongoose.model( DOCUMENT_NAME, reservationSchema, COLLECTION_NAME );