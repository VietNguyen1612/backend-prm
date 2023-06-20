"use strict";

const express = require( "express" );

const customerController = require( "../../controllers/customer.controller" );

const asyncHandler = require( "../../helpers/asyncHandler.js" );

const router = express.Router();

router.get( "/", asyncHandler( customerController.getAllCustomers ) );
router.post( "/", asyncHandler( customerController.createCustomer ) );
router.get( "/:customerId", asyncHandler( customerController.getCustomer ) );
router.delete(
    "/:customerId",
    asyncHandler( customerController.deleteCustomer )
);
router.patch(
    "/:customerId",
    asyncHandler( customerController.updateCustomer )
);
module.exports = router;
