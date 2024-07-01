const userModel = require('../models/userModels');
const { successResponse, errorResponse } = require('../utils/responseUtil');

exports.createUser = (req, res) => {
    const user = req.body;
    userModel.createUser(user, (err, result) => {
        if (err) {
            return errorResponse(res, err.message);
        }
        successResponse(res, 'User created');
    });
};

exports.editUser = (req, res) => {
    const id = req.params.id;
    const user = req.body;
    userModel.editUser(id, user, (err, result) => {
        if (err) {
            return errorResponse(res, err.message);
        }
        successResponse(res, 'User updated');
    });
};

exports.deleteUser = (req, res) => {
    const id = req.params.id;
    userModel.deleteUser(id, (err, result) => {
        if (err) {
            return errorResponse(res, err.message);
        }
        successResponse(res, 'User deleted');
    });
};

exports.viewUserList = (req, res) => {
    userModel.getUserList((err, results) => {
        if (err) {
            return errorResponse(res, err.message);
        }
        res.status(200).json({
            status: true,
            statusCode: 200,
            data: results
        });
    });
};

exports.viewUserDetails = (req, res) => {
    const id = req.params.id;
    userModel.getUserDetails(id, (err, result) => {
        if (err) {
            return errorResponse(res, err.message);
        }
        res.status(200).json({
            status: true,
            statusCode: 200,
            data: result
        });
    });
};
