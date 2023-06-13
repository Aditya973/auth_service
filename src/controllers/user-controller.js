const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req,res) => {
    try {
        console.log(req.body);
        const response = await userService.create(req.body);
        return res.status(201).json({
            data:response,
            success:true,
            message: 'user successfully created',
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            data : {},
            success : false,
            message: 'something went wrong',
            err : error
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

module.exports = {
    create,
    get
};