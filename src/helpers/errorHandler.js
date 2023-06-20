const ErrorHandler = ( statusCode, message, data = null ) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    error.data = data;
    return error;
};

const handleError = ( error, req, res, next ) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    const data = error.data || null;

    res.status( statusCode ).json( {
        error: {
            message,
            data,
        },
    } );
};

module.exports = {
    ErrorHandler,
    handleError,
};
