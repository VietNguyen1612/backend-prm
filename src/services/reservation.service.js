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
    async findReservationByCustomerId( customerId ) {
        return await this.model.find( { customer: customerId } ).lean();
    }
    async findReservationByTableId( tableId ) {
        return await this.model.find( { table: tableId } ).lean();
    }
    async findReservationByRestaurantId( restaurantId ) {
        return await this.model.find( { restaurant: restaurantId } ).lean();
    }
    async deleteAll(){
        return await this.model.deleteMany();
    }
    async getAllReservations(){
        return await this.model.find().lean().populate('feedback').populate('table').populate('customer').populate('restaurant');
    }
    async getById(id){
        return await this.model.findById(id).lean().populate('feedback').populate('table').populate('customer').populate('restaurant');
    }
}

module.exports = new ReservationsService();