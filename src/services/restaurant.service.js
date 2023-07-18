const restaurantModel = require( "../models/restaurant.model" );
const BaseService = require( "../utils/BaseRepository" );

class RestaurantService extends BaseService {
    constructor () {
        super( restaurantModel );
    }
    async findRestaurantByRestaurantOwnerId( restaurantOwner ) {
        const restaurant = await restaurantModel.find({restaurantOwner:restaurantOwner}).lean()
        return restaurant;
    }
    async deleteRestaurantByOwnerId( restaurantOwner ) {
        return await this.model.deleteMany(  restaurantOwner ).lean();
    }


}

module.exports = new RestaurantService();
