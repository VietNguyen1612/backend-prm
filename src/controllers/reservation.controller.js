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
            const { area, customerId, restaurantId } = req.params;
            const table = await TablesService.findTableByArea( { area } );
            let tableId;
            //check if the first table in table array is available
            for ( let i = 0; i < table.length; i++ ) {
                if ( table[ i ].status === 'available' ) {
                    tableId = table[ i ].id;
                    break;
                }
            }
            const customer = await CustomersService.getById( customerId );
            const reservation = await ReservationsService.create( { ...req.body, table: tableId, customer: customerId } );
            await TablesService.update( tableId, { status: 'reserved' } );
            res.send( reservation );
            console.log( 'customer', customer );
            console.log( 'reservation', reservation );
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