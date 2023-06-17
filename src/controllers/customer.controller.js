const CustomerService = require("../services/customer.service");

class CustomerController {
    getAllCustomers = async (req, res, next) => {
        res.send(await CustomerService.getAll());
    };
    getCustomer = async (req, res, next) => {
        res.send(await CustomerService.getById(req.params.customerId));
    };
    createCustomer = async (req, res, next) => {
        res.send(await CustomerService.create(req.body));
    };
    updateCustomer = async (req, res, next) => {
        res.send(await CustomerService.update(req.params.customerId, req.body));
    };
    deleteCustomer = async (req, res, next) => {
        res.send(await CustomerService.delete(req.params.customerId));
    };
}

module.exports = new CustomerController();
