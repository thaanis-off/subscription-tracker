const errorMiddleware = (err, req, res, next) =>{
    try {
        let error = {...err}; //copy of the original error (err)

        error.message = err.message; //take the message from the original error (err.message) and copy it to our error object.

        console.error(err);
        
        // Mongoose bad ObjectID
        if (err.name === 'CastError') {
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404;
        }

        // Mongoose dublicate key
        if (err.code === 11000) {
            const message = 'Dublicate field value entered';
            error = new Error(message);
            error.statusCode = 400;
        }

        // Mongoose validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.message).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({success: false, error: error.message || 'Server Error'})
    } catch (error) {
        next(error)
    }
}

export default errorMiddleware;