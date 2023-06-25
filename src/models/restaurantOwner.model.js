const mongoose = require( "mongoose" );

const DOCUMENT_NAME = "RestaurantOwner";
const COLLECTION_NAME = "restaurantOwners";
const restaurantOwnerSchema = new mongoose.Schema(
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
        },
    },
    {
        collection: COLLECTION_NAME,
        timestamps: true,
    }
);

module.exports = mongoose.model( DOCUMENT_NAME, restaurantOwnerSchema, COLLECTION_NAME );
