// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const jwtUtil = require('../utils/jwtUtil');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const { errorResponse } = require('../utils/responseUtil');

router.post('/', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return errorResponse(res, 'Invalid email or password', 400);
    }

    // Query the database to find the user by email
    const query = 'SELECT id, name, permission, password FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            return errorResponse(res, 'Database error', 500);
        }

        if (results.length === 0) {
            return errorResponse(res, 'User not found', 404);
        }

        // Compare the password with the stored hash
        const user = results[0];
        const id = results[0]?.id || ""
        const name = results[0]?.name || ""
        const permission = results[0]?.permission || ""

        bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
            if (bcryptErr || !bcryptResult) {
                return errorResponse(res, 'Invalid email or password', 401);
            }

            // Passwords match, generate JWT token
            const token = jwtUtil.generateToken(user.id);

            res.json({
                status: true,
                statusCode: 200,
                token: token,
                user: { id, name, permission },
            });
        });
    });
});

module.exports = router;
