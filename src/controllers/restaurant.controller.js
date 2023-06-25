const RestaurantService = require( "../services/restaurant.service" );

class RestaurantController {
    getAllRestaurants = async ( req, res, next ) => {
        res.send( await RestaurantService.getAll() );

    };
    getRestaurant = async ( req, res, next ) => {
        res.send( await RestaurantService.getById( req.params.restaurantId, "restaurantOwner" ) );
    };
    createRestaurant = async ( req, res, next ) => {
        const restaurantOwnerId = req.user.restaurantOwner;
        res.send( await RestaurantService.create( { ...req.body, restaurantOwner: restaurantOwnerId } ) );
    };
    updateRestaurant = async ( req, res, next ) => {
        res.send( await RestaurantService.update( req.params.restaurantId, req.body ) );
    };
    deleteRestaurant = async ( req, res, next ) => {
        res.send( await RestaurantService.delete( req.params.restaurantId ) );
    };
}

module.exports = new RestaurantController();
