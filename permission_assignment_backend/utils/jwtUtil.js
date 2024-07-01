const jwt = require('jsonwebtoken');
const secretKey = 'anjali123';

exports.generateToken = (userId) => {
    return jwt.sign({ userId: userId }, secretKey, { expiresIn: '1h' });
};

exports.verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        return null;
    }
};
