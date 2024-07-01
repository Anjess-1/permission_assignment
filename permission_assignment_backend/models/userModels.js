const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.createUser = async (user, callback) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const query = 'INSERT INTO users (name, phone_number, email, password, permission) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [user.name, user.phone_number, user.email, hashedPassword, user.permission], callback);
};

exports.editUser = (id, user, callback) => {
    const query = 'UPDATE users SET name = ?, phone_number = ?, email = ?, password = ?, permission = ? WHERE id = ?';
    db.query(query, [user.name, user.phone_number, user.email, user.password, user.permission, id], callback);
};

exports.deleteUser = (id, callback) => {
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], callback);
};

exports.getUserList = (callback) => {
    const query = 'SELECT * FROM users';
    db.query(query, callback);
};

exports.getUserDetails = (id, callback) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], callback);
};
