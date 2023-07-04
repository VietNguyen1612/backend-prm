const feedbacksModel = require('../models/feedback.model');
const BaseService = require('../utils/BaseRepository');

class FeedbackService extends BaseService {
    constructor() {
        super(feedbacksModel);
    }
}

module.exports = new FeedbackService();