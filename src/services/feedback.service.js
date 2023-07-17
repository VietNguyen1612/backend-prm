const feedbacksModel = require('../models/feedback.model');
const BaseService = require('../utils/BaseRepository');
const reservationService = require('../services/reservation.service');

class FeedbackService extends BaseService {
    constructor() {
        super(feedbacksModel);
    }
    findFeedbackByReservationId = async (reservationId) => {
        const feedback = await feedbacksModel.find({ reservationId: reservationId });
        return feedback;
    }
    findFeedbackByRestaurantId = async (restaurantId) => {
        // only show the result match with restaurantId
        const feedback = await feedbacksModel.find(
            {
                reservationId: {
                    $in: await reservationService.findReservationByRestaurantId( restaurantId)
                }
            }
        ).populate('customerId');
        return feedback;
    }
}

module.exports = new FeedbackService();