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
        arrivedDate: {
            type: Date,
            required: true
        },
        time: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        guessNum: {
            type: Number,
            required: true
        },
        note: {
            type: String,
            required: false
        }
    },
    {
        collection: COLLECTION_NAME,
        timestamps: true,
    }
);

module.exports = mongoose.model( DOCUMENT_NAME, reservationSchema, COLLECTION_NAME );