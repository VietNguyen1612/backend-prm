const restaurantModel = require( "../models/restaurant.model" );
const BaseService = require( "../utils/BaseRepository" );

class RestaurantService extends BaseService {
    constructor () {
        super( restaurantModel );
    }

}

module.exports = new RestaurantService();
