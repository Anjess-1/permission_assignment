exports.successResponse = (res, msg) => {
    res.status(200).json({
        status: true,
        statusCode: 200,
        msg: msg
    });
};

exports.errorResponse = (res, msg, statusCode = 400) => {
    res.status(statusCode).json({
        status: false,
        statusCode: statusCode,
        msg: msg
    });
};
