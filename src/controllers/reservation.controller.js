const ReservationsService = require('../services/reservation.service');
const TablesService = require('../services/table.service');
const FeedbackService = require('../services/feedback.service');
const CustomersService = require('../services/customer.service');
const RestaurantsService = require('../services/restaurant.service');
const { sendEmail } = require('../helpers/sendEmail');

class reservation {
    getAllReservations = async (req, res, next) => {
        res.send(await ReservationsService.getAll());
    }
    getReservation = async (req, res, next) => {
        res.send(await ReservationsService.getById(req.params.reservationId));
    }
    getReservationByCustomerId = async (req, res, next) => {
        res.send(await ReservationsService.findReservationByCustomerId(req.params.customerId));
    }
    getReservationByRestaurantId = async (req, res, next) => {
        res.send(await ReservationsService.findReservationByRestaurantId(req.params.restaurantId));
    }
    getReservationByTableId = async (req, res, next) => {
        res.send(await ReservationsService.findReservationByTableId(req.params.tableId));
    }
    getReservationByStatus = async (req, res, next) => {
        res.send(await ReservationsService.findReservationByStatus(req.params.status));
    }
    createReservation = async (req, res, next) => {
        try {
          const customerId = req.user.customer;
          const restaurantId = req.body.restaurant;
          const reservations = await ReservationsService.findReservationByRestaurantId(restaurantId);
          //check is restaurant is valid
            const restaurant = await RestaurantsService.getById(restaurantId);
            if (!restaurant) {
                return res.status(400).send('Restaurant not found');
            }
          const tables = await TablesService.findTableByAreaAndRestaurant(req.body.area, restaurantId);
            if (!tables.length) {
                return res.status(400).send('No table available');
            }
          const isTableReserved = (reservation, table) => {
            switch(true){
                case reservation.table.equals(table._id) && reservation.date === req.body.date && reservation.duration === req.body.duration:
                console.log("case 1")
                return true;
                case reservation.table.equals(table._id) && reservation.date !== req.body.date && reservation.duration !== req.body.duration:
                console.log("case 2")    
                return false;
                case !reservation.table.equals(table._id) && reservation.date === req.body.date && reservation.duration === req.body.duration:
                console.log("case 3")    
                return false;
            }
          }
          for (const table of tables) {
            if (!reservations.some(reservation => isTableReserved(reservation, table))) {
              const reservation = await ReservationsService.create({ ...req.body, table: table._id, customer: customerId, restaurant: restaurantId });
              return res.send(reservation);
            }
          }
            return res.status(400).send('No table available');
        } catch (error) {
            next(error);
        }

    }
    updateReservation = async (req, res, next) => {
        res.send(await ReservationsService.update(req.params.reservationId, req.body));
    }
    deleteReservation = async (req, res, next) => {
        res.send(await ReservationsService.deleteAll());
    }


}

module.exports = new reservation();
// {
//     "area":"no smoking",
//     "restaurant":"649d45753aceac3847e06701",
//     "arrivedDate":"2023-06-29",
//     "duration":"8h-12h",
//     "guessNum":4,
//     "status":"pending"
// }