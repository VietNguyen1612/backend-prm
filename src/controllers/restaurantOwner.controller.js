const RestaurantOwnerService = require( "../services/restaurantOwner.service" );

class RestaurantOwnerController {
    getAllRestaurantOwners = async ( req, res, next ) => {
        res.send( await RestaurantOwnerService.getAll() );
    };
    getRestaurantOwner = async ( req, res, next ) => {
        res.send( await RestaurantOwnerService.getById( req.params.restaurantOwnerId ) );
    };
    createRestaurantOwner = async ( req, res, next ) => {
        res.send( await RestaurantOwnerService.create( req.body ) );
    };
    updateRestaurantOwner = async ( req, res, next ) => {
        res.send( await RestaurantOwnerService.update( req.params.restaurantOwnerId, req.body ) );
    };
    deleteRestaurantOwner = async ( req, res, next ) => {
        res.send( await RestaurantOwnerService.delete( req.params.restaurantOwnerId ) );
    };
}

module.exports = new RestaurantOwnerController();
