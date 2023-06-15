const AppErrors = require('./error-handler');

class ClientError extends AppErrors{
    constructor(name,message,explaination,statusCode){
        super(name,message,explaination,statusCode);
    }
}

module.exports = ClientError;