const UserRepository = require('../repositories/user-repository');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');
const AppErrors = require('../utils/error-handler');
const {StatusCodes} = require('http-status-codes');
const ClientError = require('../utils/client-error');

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }
    
    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw error;
            }
            console.log("something went wrong in the service layer");
            throw new AppErrors(
                'ServerError',
                'logical issue found',
                'something went wrong in the service',
                500
            );
        }
    }

    async get(userId){
        try{
            const user = await this.userRepository.getById(userId);
            return user;
        }
        catch (error) {
            console.log("something went wrong in the service layer");
            throw error;
        }
    }

    async signIn(email,plainPassword){
        try{
            //fetch the user by email
            const user = await this.userRepository.getByEmail(email);

            //compare incomming plain password with stored encrypted password
            const passwordMatch = this.checkPassword(plainPassword,user.password);

            if(!passwordMatch){
                console.log('password does not match!');
                throw new ClientError(
                    'AttributeNotFound',
                    'Incorrect Password',
                    'Please Check the password as it is not correct',
                    StatusCodes.BAD_REQUEST
                );
            }

            // if password match create a new token and send it to the user
            const newJwt = this.createToken({email:user.email, id: user.id});
            return newJwt;
        }
        catch(error){
            console.log('something went wrong in the sign in process');
            throw error; 
        }
    }

    async isAuthenticated(token){
        try{
            const response = this.verifyToken(token);
            if(!response){
                throw {error:'Invalid Token'};  
            }
            const user = await this.get(response.id);
            if(!user){
                throw {error: 'No user with the corresponding token'};
            }
            return user.id;
        }
        catch(error){
            console.log('something went wrong in the auth process');
            throw error;
        }

    }

    createToken(user){
        try {
            const result = jwt.sign(user,JWT_KEY,{expiresIn:'1h'});
            return result;
        } catch (error) {
            console.log("something went wrong in token creation");
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("something went wrong in token validation ",error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword,encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("something went wrong in comparing password");
            throw error;
        }
    }

    async isAdmin(userId){
        try {
            const response = await this.userRepository.isAdmin(userId);
            return response;
        } catch (error) {
            console.log("something went wrong in service layer");
            throw error
        }
    }
}

module.exports = UserService;