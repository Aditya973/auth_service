const { StatusCodes } = require('http-status-codes');

class AppErrors extends Error{
    constructor(
        name = 'AppError',
        message = 'something went wrong',
        explaination = 'something went wrong',
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    )
    {   
        super();    
        this.name = name,
        this.explaination = explaination,
        this.message = message,
        this.statusCode = statusCode
    }
}

module.exports = AppErrors;