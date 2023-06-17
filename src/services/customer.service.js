const customerModel = require("../models/customer.model");
const BaseService = require("../utils/BaseRepository");

class CustomerService extends BaseService {
    constructor() {
        super(customerModel);
    }
}

module.exports = new CustomerService();
