const User = require('./../models/userModel');
const asyncCatch = require('./../utils/asyncCatch')

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
}

exports.getUser = asyncCatch(async ( req, res, next) => {
    let query = User.findById(req.params.id);
    const user = await query;

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    })
});