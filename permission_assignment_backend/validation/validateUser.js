const { errorResponse } = require('../utils/responseUtil');

module.exports = (req, res, next) => {
    const { name, phone_number, email, password, permission } = req.body;

    // Name validation: only alphabets, whitespace allowed, length between 3 to 100
    const nameRegex = /^[a-zA-Z\s]{3,100}$/;
    if (!name || !name.match(nameRegex)) {
        return errorResponse(res, 'Invalid or missing name');
    }

    // Phone number validation: only digits, length between 10 to 15
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phone_number || !phone_number.toString().match(phoneRegex)) {
        return errorResponse(res, 'Invalid or missing phone number');
    }

    // Email validation: basic email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !email.match(emailRegex)) {
        return errorResponse(res, 'Invalid or missing email');
    }

    // Password validation: length between 5 to 20
    if (!password || password.length < 5 || password.length > 20) {
        return errorResponse(res, 'Invalid or missing password');
    }

    // Permission validation: any string, could be further validated based on specific rules
    if (!permission || typeof permission !== 'string') {
        return errorResponse(res, 'Invalid or missing permission');
    }

    next();
};
