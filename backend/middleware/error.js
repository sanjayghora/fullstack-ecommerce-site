const ErrorHandler = require("../utils/errorhandler");


module.exports = (err, req,res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //wrong Mongodb id error
    if(err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
    //Mongoose duplicate key error
    if(err.code === 1100) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }
    //wrong jwt error
    if(err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid. Try again`;
        err = new ErrorHandler(message, 400);
    }

    //Jwt expire error
    if(err.name === "TokenExpiredError") {
        const message = `Json Web Token is Expired. Try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}