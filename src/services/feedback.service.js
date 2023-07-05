const feedbacksModel = require('../models/feedback.model');
const BaseService = require('../utils/BaseRepository');

class FeedbackService extends BaseService {
    constructor() {
        super(feedbacksModel);
    }
    findFeedbackByReservationId = async (reservationId) => {
        const feedback = await feedbacksModel.find({ reservationId: reservationId });
        return feedback;
    }
}

module.exports = new FeedbackService();