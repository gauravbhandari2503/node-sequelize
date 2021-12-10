const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

exports.getAll = (Model, attributes) => catchAsync(async(req, res, next) => {

    const {features} = new APIFeatures(req.query).filter().limitFields().sort().paginate();
    const doc = await Model.findAll({
        attributes: features.fields,
        order: features.sortBy,
        raw: true,
        where: features.filter,
        offset: features.pagination.offSet,
        limit: features.pagination.limit
    });

    res.status(201).json({
        status: 'success',
        doc
    });

});

exports.updateOne = Model => catchAsync(async(req, res, next) => {
    await Model.update(req.body, {
        where: {
            id: req.params.id
        }
    });

    res.status(201).json({
        status: 'success',
    });
});

exports.deleteOne = Model => catchAsync(async(req, res, next) => {
    await Model.destroy({
        where: {
            id: req.params.id
        }
    });

    res.status(201).json({
        status: 'success',
    });
});

exports.getOne = (Model, attributes) => catchAsync(async(req, res, next) => {
    
    const doc = await Model.findOne(
        { 
            where: {
                id: req.params.id
            },
            attributes: attributes
        }
    );

    res.status(201).json({
        status: 'success',
        doc
    });
});

exports.createOne = (Model) => catchAsync(async(req, res, next) => {

    await Model.sync();
    const doc = await Model.create(req.body);
    res.status(201).json({
        status: 'success',
        message: 'Created',
        document: doc.dataValues
    });

})