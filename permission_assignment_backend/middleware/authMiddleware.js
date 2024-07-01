const jwtUtil = require('../utils/jwtUtil');
const { errorResponse } = require('../utils/responseUtil');
const db = require('../config/db');

// Middleware to authenticate and attach user permissions
module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return errorResponse(res, 'Unauthorized', 401);
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = jwtUtil.verifyToken(token);

    if (!decodedToken) {
        return errorResponse(res, 'Unauthorized', 401);
    }

    const userId = decodedToken.userId;

    // Fetch user permissions from the database
    try {
        const query = 'SELECT permission FROM users WHERE id = ?';
        db.query(query, [userId], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return errorResponse(res, 'Database error', 500);
            }

            if (results.length === 0) {
                return errorResponse(res, 'User not found', 404);
            }

            const user = results[0];
            const userPermissions = user.permission.split(',');

            // Attach user ID and permissions to request for further processing
            req.userId = userId;
            req.userPermissions = userPermissions;

            next();
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return errorResponse(res, 'Unexpected error', 500);
    }
};

// Helper function to check user permissions
module.exports.checkPermission = (allowedPermissions) => {
    return (req, res, next) => {
        const userPermissions = req.userPermissions;

        const hasPermission = allowedPermissions.some(permission => userPermissions.includes(permission));

        if (!hasPermission) {
            return errorResponse(res, 'Forbidden', 403);
        }
        next();
    };
};
