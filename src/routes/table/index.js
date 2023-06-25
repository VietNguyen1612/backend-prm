const TableController = require( '../../controllers/table.controller' );
const { authenticate, authorize } = require( '../../helpers/authenticate' );
const express = require( 'express' );
const router = express.Router();

router.get( '/', TableController.getAllTables );
router.get( '/:tableId', TableController.getTable );
router.get( '/tableNumber/:tableNumber', TableController.getTableByNumber );
router.get( '/restaurantId/:restaurantId', TableController.getTableByRestaurantId );
router.get( '/reservationId/:reservationId', TableController.getTableByReservationId );
router.get( '/area/:area', TableController.getTableByArea );
router.get( '/status/:status', TableController.getTableByStatus );
router.post( '/', authenticate, authorize( 'admin', 'restaurantOwner' ), TableController.createTable );
router.put( '/:tableId', authenticate, authorize( 'admin', 'restaurantOwner' ), TableController.updateTable );
router.delete( '/:tableId', authenticate, authorize( 'admin', 'restaurantOwner' ), TableController.deleteTable );

module.exports = router;