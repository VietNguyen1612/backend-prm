const RestaurantService = require( "../services/restaurant.service" );

class RestaurantController {

    getAllRestaurants = async ( req, res, next ) => {
        const restaurants = await RestaurantService.getAll()
        //check all restaurants status if it equal to "active" and return it
        const activeRestaurants = restaurants.filter(restaurant => restaurant.status === "active")
        res.send( activeRestaurants ); 
    };
    getRestaurant = async ( req, res, next ) => {
        const restaurant = await RestaurantService.getById( req.params.restaurantId, "restaurantOwner" ) ;
    };
    getRestaurantByRestaurantOwnerId = async ( req, res, next ) => {
        const restaurantOwnerId = req.params.restaurantOwner;
        console.log(req.user)
        res.send( await RestaurantService.findRestaurantByRestaurantOwnerId( restaurantOwnerId ) );
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
