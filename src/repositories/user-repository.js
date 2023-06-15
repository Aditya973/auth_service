const ValidationError = require('../utils/validation-error');
const ClientError = require('../utils/client-error'); 
const {StatusCodes} = require('http-status-codes');
const { User,Role } = require('../models/index');

class UserRepository{
    async create(data){
        console.log(data);  
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                throw new ValidationError(error);
            }
            console.log("something went wrong in the repository layer");
            throw error;
        }
    }
    
    async destroy(userId){
        try{
            await User.destroy({
                where:{
                    id:userId
                }
            });
            return true;
        }
        catch(error){
            console.log("something went wrong in the repository layer");
            throw error;
        }
    }

    async getById(userId){
        try{
            const user = await User.findByPk(userId,{
                attributes:['email','id']
            })
            return user;
        }
        catch(error){
            console.log("something went wrong in the repository layer");
            throw error;
        }
    }

    async getByEmail(userEmail){
        try {
            const user = await User.findOne({
                where:{
                    email:userEmail
                }
            });
            if(!user){
                throw new ClientError(
                    'AttributeNotFound',
                    'Invalid email sent in the request',
                    'Please check the email, as there is no record of the email',
                    StatusCodes.NOT_FOUND
                )
            }
            return user;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw error;
        }
    }

    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where:{
                    name:'ADMIN'
                }
            });
            const response = user.hasRole(adminRole);
            return response;
        } catch (error) {
            console.log("something went wrong in the repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;