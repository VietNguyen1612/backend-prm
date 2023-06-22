/* This is a TableController class that handles requests related to tables and interacts with the table
service. */
const tableService = require( '../services/table.service' );

class TableController {
    getAllTables = async ( req, res, next ) => {
        res.send( await tableService.getAll() );
    };
    getTable = async ( req, res, next ) => {
        res.send( await tableService.getById( req.params.tableId ) );
    };
    getTableByNumber = async ( req, res, next ) => {
        res.send( await tableService.findTableByNumber( req.params.tableNumber ) );
    }
    getTableByRestaurantId = async ( req, res, next ) => {
        res.send( await tableService.findTableByRestaurantId( req.params.restaurantId ) );
    }
    getTableByReservationId = async ( req, res, next ) => {
        res.send( await tableService.findTableByReservationId( req.params.reservationId ) );
    }
    getTableByArea = async ( req, res, next ) => {
        res.send( await tableService.findTableByArea( req.params.area ) );
    }
    getTableByStatus = async ( req, res, next ) => {
        res.send( await tableService.findTableByStatus( req.params.status ) );
    }
    createTable = async ( req, res, next ) => {
        res.send( await tableService.create( req.body ) );
    };
    updateTable = async ( req, res, next ) => {
        res.send( await tableService.update( req.params.tableId, req.body ) );
    };
    deleteTable = async ( req, res, next ) => {
        res.send( await tableService.delete( req.params.tableId ) );
    };
}

module.exports = new TableController();