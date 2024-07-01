import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const CreateUserPopup = ({ onClose, onUserCreated, editUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState({
        VIEW: false,
        CREATE: false,
        EDIT: false,
        DELETE: false,
    });

    useEffect(() => {
        if (editUser) {
            setName(editUser.name);
            setEmail(editUser.email);
            setPhoneNumber(editUser.phone_number);
            setPassword(''); // Do not prefill the password
            const userRoles = editUser.permission.split(',');
            setRoles({
                VIEW: userRoles.includes('VIEW'),
                CREATE: userRoles.includes('CREATE'),
                EDIT: userRoles.includes('EDIT'),
                DELETE: userRoles.includes('DELETE'),
            });
        }
    }, [editUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const permissions = Object.keys(roles).filter(role => roles[role]).join(',');
        const token = Cookies.get('token');

        try {
            if (editUser) {
                // Update user
                await axios.put(`http://localhost:3001/user/${editUser.id}`, {
                    name,
                    email,
                    phone_number: phoneNumber,
                    password: password || undefined, // Only send password if it's not empty
                    permission: permissions
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                // Create new user
                await axios.post('http://localhost:3001/user', {
                    name,
                    email,
                    phone_number: phoneNumber,
                    password,
                    permission: permissions
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            onClose();
            onUserCreated(); // Call the callback to fetch the updated user list
        } catch (err) {
            console.error(err);
        }
    };

    const handleRoleChange = (role) => {
        setRoles({ ...roles, [role]: !roles[role] });
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>{editUser ? 'Edit User' : 'Create New User'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required={!editUser} />
                    </div>
                    <div className="form-group roles-group">
                        <label>Roles:</label>
                        <div>
                            <label>
                                <input type="checkbox" checked={roles.VIEW} onChange={() => handleRoleChange('VIEW')} /> VIEW
                            </label>
                            <label>
                                <input type="checkbox" checked={roles.CREATE} onChange={() => handleRoleChange('CREATE')} /> CREATE
                            </label>
                            <label>
                                <input type="checkbox" checked={roles.EDIT} onChange={() => handleRoleChange('EDIT')} /> EDIT
                            </label>
                            <label>
                                <input type="checkbox" checked={roles.DELETE} onChange={() => handleRoleChange('DELETE')} /> DELETE
                            </label>
                        </div>
                    </div>
                    <div className="form-buttons">
                        <button type="submit" className="submit-button">Submit</button>
                        <button type="button" className="close-button" onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUserPopup;
