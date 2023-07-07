const { ErrorHandler } = require("../helpers/errorHandler");
const RestaurantService = require( "../services/restaurant.service" );

class RestaurantController {

    getAllRestaurants = async ( req, res, next ) => {
        const restaurants = await RestaurantService.getAll()
        //check all restaurants status if it equal to "active" and return it
        const activeRestaurants = restaurants.filter(restaurant => restaurant.status === "active")
        if(!activeRestaurants.length){
            throw ErrorHandler( 404, "No active restaurants found" );
        }
        res.send( activeRestaurants ); 
        // res.send( restaurants );
    };
    getAllRestaurantsForAdmin = async ( req, res, next ) => {
        const restaurants = await RestaurantService.getAll()
        res.send( restaurants );
    };
    getRestaurant = async ( req, res, next ) => {
        const restaurant = await RestaurantService.getById( req.params.restaurantId, "restaurantOwner" ) ;
        if(!restaurant){
            throw ErrorHandler( 404, "Restaurant not found" );
        }
        res.send( restaurant );
    };
    getRestaurantByRestaurantOwnerId = async ( req, res, next ) => {
        const restaurantOwnerId = req.params.restaurantOwner;
        console.log(req.user)
        res.send( await RestaurantService.findRestaurantByRestaurantOwnerId( restaurantOwnerId ) );
    };
    createRestaurant = async ( req, res, next ) => {
        const restaurantOwnerId = req.user.restaurantOwner;
        const create = await RestaurantService.create( { ...req.body, restaurantOwner: restaurantOwnerId } ) ;
        if(!create){
            throw ErrorHandler( 404, "Restaurant not created" );
        }
        res.send( create );
    };
    updateRestaurant = async ( req, res, next ) => {
        const update = await RestaurantService.update( req.params.restaurantId, req.body ) ;
        if(!update){
            throw ErrorHandler( 404, "Restaurant not updated" );
        }
        res.send( update );
    };
    deleteRestaurant = async ( req, res, next ) => {
        const deleteRestaurant = await RestaurantService.delete( req.params.restaurantId ) ;
        if(!deleteRestaurant){
            throw ErrorHandler( 404, "Restaurant not deleted" );
        }
        res.send( deleteRestaurant );
    };
}

module.exports = new RestaurantController();
