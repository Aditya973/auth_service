const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req,res) => {
    try {
        const response = await userService.create(req.body);
        return res.status(201).json({
            data:response,
            success:true,
            message: 'user successfully created',
            err: {}
        })
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            data : {},
            success : false,
            message: error.message,
            err : error.explaination
        })
    }
}

const get = async (req,res) => {
    try {
        const user = await userService.get(req.params.id);
        return res.status(200).json({
            data:user,
            success:true,
            message:'succesfully fetched',
            err : {}
        });
    } 
    catch (error) {
        return res.status(500).json({
            data : {},
            success : false,
            message: 'something went wrong',
            err : error
        });
    }
}

const signIn = async (req,res) => {
    try {
        const response = await userService.signIn(req.body.email,req.body.password);
        return res.status(200).json({
            data:response,
            success:true,
            message: 'successfully signed in',
            err: {}
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            data : {},
            success : false,
            message: 'something went wrong',
            err : error
        });
    }
}

const isAuthenticated = async (req,res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data:response,
            success:true,
            message: 'user is authenticated and token is valid',
            err:{}
        });
    } catch (error) {
        return res.status(500).json({
            data : {},
            success : false,
            message: 'something went wrong',
            err : error
        });
    }
}

const isAdmin = async (req,res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data:response,
            success : true,
            message : 'successfully fetched whether user is admin or not',
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            data : {},
            success : false,
            message: 'something went wrong',
            err : error
        });
    }
    
}

module.exports = {
    create,
    get,
    signIn,
    isAuthenticated,
    isAdmin
};