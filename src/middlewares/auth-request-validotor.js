const validateUserAuth = (req,res,next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            data : {},
            success : false,
            message : 'something went wrong',
            err : 'missing email or password'
        })
    }
    next();
}

module.exports = {
    validateUserAuth
}