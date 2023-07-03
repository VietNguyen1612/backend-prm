const { response } = require("express");
const restaurantModel = require( "../models/restaurant.model" );
const BaseService = require( "../utils/BaseRepository" );

class RestaurantService extends BaseService {
    constructor () {
        super( restaurantModel );
    }
    async findRestaurantByRestaurantOwnerId( restaurantOwnerId ) {
        return await this.model.find( { restaurantOwner: restaurantOwnerId } ).lean();
    }

}

module.exports = new RestaurantService();
