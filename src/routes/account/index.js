"use strict";

const express = require( "express" );
const accountController = require( "../../controllers/account.controller" );
const asyncHandler = require( "../../helpers/asyncHandler.js" );
const { authenticate, authorize, isOwner } = require( "../../helpers/authenticate" );

const router = express.Router();

router.get( "/", authenticate, authorize( 'restaurantOwner', 'admin' ), asyncHandler( accountController.getAllAccounts ) ); //authored
router.post( "/register", asyncHandler( accountController.createAccount ) );
router.post( "/login", asyncHandler( accountController.login ) );
router.get( "/:accountId", authenticate, isOwner, asyncHandler( accountController.getAccount ) );
router.delete( "/:accountId", asyncHandler( accountController.deleteAccount ) );
router.patch( "/:accountId", asyncHandler( accountController.updateAccount ) );

module.exports = router;
