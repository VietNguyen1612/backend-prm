const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;


const DOCUMENT_NAME = 'Account';
const COLLECTION_NAME = 'accounts';

const accountSchema = new Schema( {
    username: { //email
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: [ 'admin', 'customer', 'restaurantOwner' ],
        default: 'customer'
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    restaurantOwnerId: {
        type: Schema.Types.ObjectId,
        ref: 'RestaurantOwner'
    }
}
    , {
        collection: COLLECTION_NAME,
        timestamps: true,
    }
);
module.exports = mongoose.model( DOCUMENT_NAME, accountSchema, COLLECTION_NAME );