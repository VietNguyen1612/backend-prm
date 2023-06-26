const reservationsModel = require( '../models/reservation.model' );
const BaseService = require( '../utils/BaseRepository' );

class ReservationsService extends BaseService {
    constructor () {
        super( reservationsModel );
    }
}

module.exports = new ReservationsService();