const mongoose = require( "mongoose" );

const DOCUMENT_NAME = "Restaurant";
const COLLECTION_NAME = "restaurants";
const restaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        restaurantOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RestaurantOwner',
            required: 'true'
        }
    },
    {
        collection: COLLECTION_NAME,
        timestamps: true,
    }
);

module.exports = mongoose.model( DOCUMENT_NAME, restaurantSchema, COLLECTION_NAME );
