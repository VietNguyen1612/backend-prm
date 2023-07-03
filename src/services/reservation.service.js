const reservationsModel = require( '../models/reservation.model' );
const BaseService = require( '../utils/BaseRepository' );

class ReservationsService extends BaseService {
    constructor () {
        super( reservationsModel );
    }
    async findReservationByDate( date, duration ) {
        return await this.model.find( { date, duration } ).lean();
    }
    async findReservationByStatus( status ) {
        return await this.model.find( { status } ).lean();
    }
}

module.exports = new ReservationsService();