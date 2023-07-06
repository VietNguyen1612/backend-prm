const ReservationsService = require('../services/reservation.service');
const TablesService = require('../services/table.service');
const FeedbackService = require('../services/feedback.service');
const CustomersService = require('../services/customer.service');
const RestaurantsService = require('../services/restaurant.service');
const { sendEmail } = require('../helpers/sendEmail');
const { ErrorHandler } = require('../helpers/errorHandler');
const ObjectId = require('mongoose').Types.ObjectId;

class reservation {
    getAllReservations = async (req, res, next) => {
        const reservations = await ReservationsService.getAllReservations()
        if (!reservations) {
          throw ErrorHandler(404, 'No reservations found');
        }
        res.send(reservations);
      }
    
      getReservation = async (req, res, next) => {
        const reservation = await ReservationsService.findById(req.params.reservationId);
        if (!reservation) {
          throw ErrorHandler(404, 'Reservation not found');
        }
        res.send(reservation);
      }
    
      getReservationByCustomerId = async (req, res, next) => {
        const reservations = await ReservationsService.findReservationByCustomerId(req.params.customerId);
        if (!reservations) {
          throw ErrorHandler(404, 'No reservations found for this customer');
        }
        res.send(reservations);
      }
    
      getReservationByRestaurantId = async (req, res, next) => {
        const reservations = await ReservationsService.findReservationByRestaurantId(req.params.restaurantId);
        if (!reservations) {
          throw ErrorHandler(404, 'No reservations found for this restaurant');
        }
        res.status(200).send(reservations);
      }
    
      getReservationByTableId = async (req, res, next) => {
        const reservations = await ReservationsService.findReservationByTableId(req.params.tableId);
        if (!reservations) {
          throw ErrorHandler(404, 'No reservations found for this table');
        }
        res.send(reservations);
      }
    
      getReservationByStatus = async (req, res, next) => {
        const reservations = await ReservationsService.findReservationByStatus(req.params.status);
        if (!reservations) {
          throw ErrorHandler(404, 'No reservations found with this status');
        }
        res.send(reservations);
      }

      getReservationByRestaurantOwnerId = async (req, res, next) => {
        const restaurantOwner = req.params.restaurantOwnerId;
        const restaurants = await RestaurantsService.findRestaurantByRestaurantOwnerId({restaurantOwner: restaurantOwner});
        if (!restaurants) {
          throw ErrorHandler(404, 'No restaurants found for this owner');
        }
        for(const restaurant of restaurants){
          const restaurantId = new ObjectId(restaurant._id);
          const reservations = await ReservationsService.findReservationByRestaurantId(restaurantId);
          if (!reservations) {
            throw ErrorHandler(404, 'No reservations found for this restaurant owner');
          }
          if(reservations.length > 0){
            res.status(200).send(reservations);
          }
      }
    }
    
      createReservation = async (req, res, next) => {
        try {
          const customerId = req.user.customer;
          const restaurantId = req.body.restaurant;
          const reservations = await ReservationsService.findReservationByRestaurantId(restaurantId);
          //check if restaurant is valid
          const restaurant = await RestaurantsService.getById(restaurantId);
          if (!restaurant) {
            throw ErrorHandler(404, 'Restaurant not found');
          }
          const tables = await TablesService.findTableByAreaAndRestaurant(req.body.area, restaurantId);
          if (!tables.length) {
            throw ErrorHandler(404, 'No tables found');
          }
          const arrivedDate = new Date(req.body.arrivedDate);
          const isTableReserved = (reservation, table) => {
            const reservationArrivedDate = new Date(reservation.arrivedDate);
            switch(true){
              case 
              reservation.table.equals(table._id) && 
              reservationArrivedDate.getTime() === arrivedDate.getTime() && 
              reservation.duration === req.body.duration:
                return true;
              case 
              reservation.table.equals(table._id) && 
              reservationArrivedDate.getTime() !== arrivedDate.getTime() && 
              reservation.duration !== req.body.duration:
                return false;
              case 
              !reservation.table.equals(table._id) 
              && reservationArrivedDate.getTime() === arrivedDate.getTime()
              && reservation.duration === req.body.duration:
                return false;
            }
          }
          for (const table of tables) {
            if (!reservations.some(reservation => isTableReserved(reservation, table))) {
              const reservation = await ReservationsService.create({ ...req.body, table: table._id, customer: customerId, restaurant: restaurantId });
              return res.send(reservation);
            }
          }
          throw ErrorHandler(404, 'No tables found');
        } catch (error) {
          next(error);
        }
      }
    
      updateReservation = async (req, res, next) => {
        const reservation = await ReservationsService.update(req.params.reservationId, req.body);
        if (!reservation) {
          throw ErrorHandler(404, 'Reservation not found');
        }
        res.send(reservation);
      }
    
      deleteReservation = async (req, res, next) => {
        const result = await ReservationsService.deleteAll();
        if (!result) {
          throw ErrorHandler(404, 'No reservations found');
        }
        res.send(result);
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