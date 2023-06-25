const passport = require( 'passport' );
const JwtStrategy = require( 'passport-jwt' ).Strategy;
const { ExtractJwt } = require( 'passport-jwt' );
const User = require( '../models/account.model' );

// JWT strategy configuration
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

// JWT strategy implementation
const jwtStrategy = new JwtStrategy( jwtOptions, async ( payload, done ) => {
    try {
        // Find the user based on the ID from the JWT payload
        const user = await User.findById( payload._id );

        if ( !user ) {
            return done( null, false );
        }

        // If the user is found, return it
        return done( null, user );
    } catch ( error ) {
        return done( error, false );
    }
} );

// Initialize Passport and use the JWT strategy
passport.use( jwtStrategy );

// Authentication middleware using JWT strategy
const authenticate = ( req, res, next ) => {
    passport.authenticate( 'jwt', { session: false }, ( err, user, info ) => {
        if ( err ) {
            return next( err );
        }
        if ( !user ) {
            return res.status( 401 ).send( { message: 'Unauthorized' } );
        }
        req.user = user;
        next();
    } )( req, res, next );
};
const authorize = ( ...roles ) => {
    //get role from jwt token
    return ( req, res, next ) => {
        if ( !roles.includes( req.user.role ) ) {
            return res.status( 403 ).send( { message: 'Forbidden' } );
        }
        next();
    }
};
const isOwner = ( req, res, next ) => {
    if ( req.user._id.toString() === req.params.accountId ) {
        next();
    } else if ( req.user.role === 'admin' ) {
        next();
    } else {
        return res.status( 403 ).send( { message: 'You cannot view other info' } );
    }
};


exports.authenticate = authenticate;
exports.authorize = authorize;
exports.isOwner = isOwner;