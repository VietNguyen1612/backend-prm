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
        price: {
            type: String,
            default: "Contact for price"
        },
        description: {
            type: String,
        },
        status:{
            type: String,
            enum:['active','inactive'],
            default:'active'
        },

        image: {
            type: Array,
            default: []
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
