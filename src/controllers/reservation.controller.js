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
            const customerId = req.user.customerId;
            const getReservation = await ReservationsService.getAll();
            const isReserved = async (req) => {
                for (const reservation of getReservation) {
                    for (const table of await TablesService.findTableByArea(  req.body.area  )) {
                        if (
                            reservation.table === table._id &&
                            reservation.arrivedDate === req.body.arrivedDate &&
                            reservation.duration === req.body.duration
                        ) {
                            console.log('table is reserved')
                            continue;
                        } else{
                            const reservation = await ReservationsService.create( { ...req.body, table: table._id, customer: customerId } );
                            res.send( reservation );
                            break;
                        }
                    }
                }
            };
            isReserved(req);
            
            //check if the first table in table array is available
            // const reservation = await ReservationsService.create( { ...req.body, table: table._id, customer: customerId } );

            //check after the reservation is created, 2 hours after the reserved time, the table will be available again
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