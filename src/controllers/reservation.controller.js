const ReservationsService = require( '../services/reservation.service' );
const TablesService = require( '../services/table.service' );
const CustomersService = require( '../services/customer.service' );
const RestaurantsService = require( '../services/restaurant.service' );
const { sendEmail } = require( '../helpers/sendEmail' );

class reservation {
    getAllReservations = async ( req, res, next ) => {
        res.send( await ReservationsService.getAll() );
    }
    getReservation = async ( req, res, next ) => {
        res.send( await ReservationsService.getById( req.params.reservationId ) );
    }
    getReservationByCustomerId = async ( req, res, next ) => {
        res.send( await ReservationsService.findReservationByCustomerId( req.params.customerId ) );
    }
    getReservationByRestaurantId = async ( req, res, next ) => {
        res.send( await ReservationsService.findReservationByRestaurantId( req.params.restaurantId ) );
    }
    getReservationByTableId = async ( req, res, next ) => {
        res.send( await ReservationsService.findReservationByTableId( req.params.tableId ) );
    }
    getReservationByStatus = async ( req, res, next ) => {
        res.send( await ReservationsService.findReservationByStatus( req.params.status ) );
    }
    createReservation = async ( req, res, next ) => {
        try {
            const { tableId, customerId, restaurantId } = req.params;
            const table = await TablesService.getById( tableId );
            const customer = await CustomersService.getById( customerId );
            const restaurant = await RestaurantsService.getById( restaurantId );
            const reservation = await ReservationsService.create( { ...req.body, tableId, customerId, restaurantId } );
            // await sendEmail( {
            //     to: customer.email,
            //     subject: `Reservation Confirmation`,
            //     text: `Dear ${ customer.name },\n\nYour reservation at ${ restaurant.name } has been confirmed.\n\nReservation Details:\n\nDate: ${ reservation.date }\nTime: ${ reservation.time }\nNumber of Guests: ${ reservation.guests }\n\nThank you for choosing ${ restaurant.name }!`
            // } );
            res.send( `Reservation created successfully! with id: ${ reservation.id }, for customer: ${ customer.name }, at restaurant: ${ restaurant.name }, at table: ${ table.name }` );
            res.send( reservation );
        } catch ( error ) {
            next( error );
        }

    }
    updateReservation = async ( req, res, next ) => {
        res.send( await ReservationsService.update( req.params.reservationId, req.body ) );
    }
    deleteReservation = async ( req, res, next ) => {
        res.send( await ReservationsService.delete( req.params.reservationId ) );
    }

}

module.exports = new reservation();