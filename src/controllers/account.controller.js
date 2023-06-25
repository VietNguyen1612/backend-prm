const AccountService = require( "../services/account.service" );
const { validationResult } = require( "express-validator" );
const { ErrorHandler } = require( "../helpers/errorHandler.js" );
const { hashPassword, comparePassword } = require( "../helpers/passwordHash" );
const { generateToken } = require( "../helpers/jwt" );
const CustomerService = require( "../services/customer.service" );
const RestaurantOwnerService = require( "../services/restaurantOwner.service" );

class AccountController {
    getAllAccounts = async ( req, res, next ) => {
        try {
            const accounts = await AccountService.getAll();
            res.send( accounts );
        } catch ( error ) {
            next( error );
        }
    };

    getAccount = async ( req, res, next ) => {
        try {
            const account = await AccountService.getById( req.params.accountId, [ "customer", "restaurantOwner" ] );
            res.send( account );
        } catch ( error ) {
            next( error );
        }
    };

    createAccount = async ( req, res, next ) => {
        try {
            const errors = validationResult( req );
            if ( !errors.isEmpty() ) {
                throw ErrorHandler( 400, "Validation Error", errors.array() );
            }
            const { email, password, role, phone, address, name } = req.body;
            const hashedPassword = await hashPassword( password );
            switch ( role ) {
                case 'customer':
                    const Customer = await CustomerService.create( { phone, address, name } );
                    const customerAccount = await AccountService.create( { email, password: hashedPassword, role, customer: Customer._id } );
                    res.send( customerAccount );
                    break;
                case 'restaurantOwner':
                    const RestaurantOwner = await RestaurantOwnerService.create( { phone, address, name } );
                    const restaurantOwnerAccount = await AccountService.create( { email, password: hashedPassword, role, restaurantOwner: RestaurantOwner._id } );
                    res.send( restaurantOwnerAccount );
                    break;
                default:
                    break;
            }
        } catch ( error ) {
            next( error )
        }
    };
    updateAccount = async ( req, res, next ) => {
        try {
            const errors = validationResult( req );
            if ( !errors.isEmpty() ) {
                throw ErrorHandler( 400, "Validation Error", errors.array() );
            }
            const { email, password, role } = req.body;
            const hashedPassword = await hashPassword( password );
            const account = await AccountService.update( req.params.accountId, { email, password: hashedPassword, role } );
            res.send( account );
        } catch ( error ) {
            next( error );
        }
    };

    deleteAccount = async ( req, res, next ) => {
        try {
            const account = await AccountService.delete( req.params.accountId );
            res.send( account );
        } catch ( error ) {
            next( error );
        }
    };

    login = async ( req, res, next ) => {
        try {
            const errors = validationResult( req );
            if ( !errors.isEmpty() ) {
                throw ErrorHandler( 400, "Validation Error", errors.array() );
            }
            const { email, password } = req.body;
            const account = await AccountService.findAccountByEmail( email );
            if ( !account ) {
                throw ErrorHandler( 400, "Invalid Credentials" );
            }
            const isMatch = await comparePassword
                ( password, account.password );
            if ( !isMatch ) {
                throw ErrorHandler( 400, "Invalid Credentials" );
            }
            const token = generateToken( account );
            res.send( { token } );
        } catch ( error ) {
            next( error );
        }
    };
    forgetPassword = async ( req, res, next ) => {
        try {
            const errors = validationResult( req );
            if ( !errors.isEmpty() ) {
                throw ErrorHandler( 400, "Validation Error", errors.array() );
            }
            const { email } = req.body;
            const account = await AccountService.findAccountByEmail( email );
            if ( !account ) {
                throw ErrorHandler( 400, "Invalid Credentials" );
            }
            const token = generateToken( account );
            res.send( { token } );
        } catch ( error ) {
            next( error );
        }
    }
}


module.exports = new AccountController();