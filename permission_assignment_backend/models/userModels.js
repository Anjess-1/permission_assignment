const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.createUser = async (user, callback) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const query = 'INSERT INTO users (name, phone_number, email, password, permission) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [user.name, user.phone_number, user.email, hashedPassword, user.permission], callback);
};

exports.editUser = (id, user, callback) => {
    const finalPayload = []
    let finalQuery = ""

    if (user?.name) {
        finalPayload.push(user.name)
        finalQuery += 'name = ?,'
    }
    if (user?.password) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        finalPayload.push(hashedPassword)
        finalQuery += 'password = ?,'
    }
    finalQuery = finalQuery.replace(/,\s*$/, '')
    const query = `UPDATE users SET ${finalQuery}  WHERE id = ?`;
    // 'name = ?, phone_number = ?, email = ?, password = ?, permission = ?'
    // [user.name, user.phone_number, user.email, user.password, user.permission, id]
    db.query(query, finalPayload, callback);
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
