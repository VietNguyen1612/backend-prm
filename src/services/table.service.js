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
    async findTableByAreaAndRestaurant( area, restaurantId ) {
        return await this.model.find( { area,restaurantId }, ).lean();
    }
    async findTableByStatus( status ) {
        return await this.model.find( { status } ).lean();
    }
    async checkTableAvailability( areaId, { arriveDate, time } ) {
        //check if the table is available at the time
        const table = await this.model.findOne( { areaId, arriveDate, time } )
            .populate( 'reservationId' )
            .lean();
        if ( table.status === 'available' ) {
            return true;
        }
    }
}

module.exports = new TableService();