import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import CreateUserPopup from './CreateUserPopup';
import DeleteConfirmationPopup from './DeleteConfirmationPopup';

const UserList = ({ setIsAuthenticated, isAuthenticated }) => {
    const [users, setUsers] = useState([]);
    const [showCreateUserPopup, setShowCreateUserPopup] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const user = JSON.parse(Cookies.get('user') || "{}");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = Cookies.get('token');
            const response = await axios.get('http://localhost:3001/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        Cookies.remove('user');
        Cookies.remove('token');
        setIsAuthenticated(false);
    };

    const isUserEligibleToCreate = (user) => user?.permission?.includes('CREATE');
    const isUserEligibleToEdit = (user) => user?.permission?.includes('EDIT');
    const isUserEligibleToDelete = (user) => user?.permission?.includes('DELETE');

    const handleEditClick = (user) => {
        setEditUser(user);
        setShowCreateUserPopup(true);
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowDeletePopup(true);
    };

    const handleDeleteConfirm = async () => {
        const token = Cookies.get('token');
        try {
            await axios.delete(`http://localhost:3001/user/${userToDelete.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setShowDeletePopup(false);
            fetchUsers(); // Refresh the user list after deletion
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="userlist-container">
            <h2>Welcome, {user?.name || ""}</h2>
            {isAuthenticated && <button className="logout-button" onClick={handleLogout}>Logout</button>}
            {isUserEligibleToCreate(user) && (
                <div className="create-user-container">
                    <button className="create-button" onClick={() => { setEditUser(null); setShowCreateUserPopup(true); }}>Create New User</button>
                    {showCreateUserPopup && (
                        <CreateUserPopup
                            onClose={() => setShowCreateUserPopup(false)}
                            onUserCreated={fetchUsers}
                            editUser={editUser}
                        />
                    )}
                </div>
            )}
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Number</th>
                        <th>Permissions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length && users.map((users) => (
                        <tr key={users.id}>
                            <td>{users.name}</td>
                            <td>{users.email}</td>
                            <td>{users.phone_number}</td>
                            <td>{users.permission}</td>
                            <td>
                                {isUserEligibleToEdit(user) && <button className="action-button" onClick={() => handleEditClick(users)}>Edit</button>}
                                {isUserEligibleToDelete(user) && <button className="action-button delete-button" onClick={() => handleDeleteClick(users)}>Delete</button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showDeletePopup && (
                <DeleteConfirmationPopup
                    onClose={() => setShowDeletePopup(false)}
                    onConfirm={handleDeleteConfirm}
                />
            )}
        </div>
    );
};

export default UserList;
