import React from 'react';

const DeleteConfirmationPopup = ({ onClose, onConfirm }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3>Are you sure you want to delete this user?</h3>
                <div className="popup-buttons">
                    <button className="confirm-button" onClick={onConfirm}>Yes</button>
                    <button className="cancel-button" onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationPopup;
