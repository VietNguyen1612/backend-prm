//create a send email
// Path: src\utils\email.js
const nodemailer = require( 'nodemailer' );
const { google } = require( 'googleapis' );
const OAuth2 = google.auth.OAuth2;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';
const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env;
const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
);
//send email
const sendEmail = async ( { email, subject, message } ) => {
    try {
        oauth2Client.setCredentials( {
            refresh_token: MAILING_SERVICE_REFRESH_TOKEN
        } );
        const accessToken = await new Promise( ( resolve, reject ) => {
            oauth2Client.getAccessToken( ( err, token ) => {
                if ( err ) {
                    reject( err );
                }
                resolve( token );
            } );
        } );
        const transport = nodemailer.createTransport( {
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: SENDER_EMAIL_ADDRESS,
                accessToken,
                clientId: MAILING_SERVICE_CLIENT_ID,
                clientSecret: MAILING_SERVICE_CLIENT_SECRET,
                refreshToken: MAILING_SERVICE_REFRESH_TOKEN
            }
        } );
        const mailOptions = {
            from: SENDER_EMAIL_ADDRESS,
            to: email,
            subject: subject,
            text: message
        };
        const result = await transport.sendMail( mailOptions );
        return result;
    } catch ( error ) {
        return error;
    }
}
module.exports = { sendEmail };