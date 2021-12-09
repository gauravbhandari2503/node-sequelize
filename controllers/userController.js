const AppError = require('../utils/appError');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.createUser = catchAsync( async(req, res, next) => {
    await User.sync();
    const user = await User.create(req.body);
    res.status(201).json({
        status: 'success',
        message: 'user created successfully',
        user: user.dataValues
    })
});

exports.updateUser = (async(req, res, next) => {

});

exports.deleteUser = (async(req, res, next) => {

});

exports.getAllUsers = catchAsync( async(req, res, next) => {
    const users = await User.findAll({
        attributes: {exclude: ['password']},
        order: [['id','DESC']],
        raw: true
    });

    res.status(201).json({
        status: 'success',
        users
    })
});

exports.getUser = (async(req, res, next) => {
    const user = await User.findOne(
        { 
            where: {
                id: req.params.id
            },
            attributes: {exclude: ['password']}
        }
    );

    res.status(201).json({
        status: 'success',
        user
    })
});