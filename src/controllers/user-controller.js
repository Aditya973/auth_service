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

module.exports = {
    create
};