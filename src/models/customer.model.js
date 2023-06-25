const mongoose = require( "mongoose" );

const DOCUMENT_NAME = "Customer";
const COLLECTION_NAME = "customers";
const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    {
        collection: COLLECTION_NAME,
        timestamps: true,
    }
);

module.exports = mongoose.model( DOCUMENT_NAME, customerSchema, COLLECTION_NAME );
