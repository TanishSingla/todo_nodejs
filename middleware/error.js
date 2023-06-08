
class ErrorHandler extends Error {

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

};

export const errorMiddleware = (err, req, resp, next) => {

    err.message = err.message || "Internal Servrer Error";
    err.statusCode = err.statusCode || 500;
    
    return resp.status(404).json({
        success: false,
        message: err.message,
    });
}

export default ErrorHandler;