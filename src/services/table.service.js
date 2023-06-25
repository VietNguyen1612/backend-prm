const tableModel = require( '../models/table.model' );
const BaseService = require( '../utils/BaseRepository' );

class TableService extends BaseService {
    constructor () {
        super( tableModel );
    }
    async findTableByNumber( tableNumber ) {
        return await this.model.findOne( { tableNumber } ).lean();
    }
    async findTableByRestaurantId( restaurantId ) {
        return await this.model.find( { restaurantId } ).lean();
    }
    async findTableByReservationId( reservationId ) {
        return await this.model.findOne( { reservationId } ).lean();
    }
    async findTableByArea( area ) {
        return await this.model.find( { area } ).lean();
    }
    async findTableByStatus( status ) {
        return await this.model.find( { status } ).lean();
    }
}

module.exports = new TableService();