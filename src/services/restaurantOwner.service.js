const restaurantOwnerModel = require("../models/restaurantOwner.model");
const BaseService = require("../utils/BaseRepository");

class RestaurantOwnerService extends BaseService {
    constructor() {
        super(restaurantOwnerModel);
    }
}

module.exports = new RestaurantOwnerService();
