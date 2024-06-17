/**
 * AddedCentwiseFriend Component
 * 
 * The AddedCentwiseFriend component is responsible for adding an existing Centwise user as a friend.
 * It displays a modal with a form to input the friend's email address and handles the submission of the form.
 * The modal can be closed, and the user is navigated to the friends page after successfully adding the friend.
 * 
 * @component
 * @example
 * // Import the AddedCentwiseFriend component
 * import AddedCentwiseFriend from './path/to/AddedCentwiseFriend';
 * 
 * // Render the AddedCentwiseFriend component in your React application
 * <AddedCentwiseFriend />
 */
import React, { useRef, useState } from "react";

// Importing styles, axios for making HTTP requests, and the react-router-dom hook for navigation
import styles from "./AddCentwiseFriend.module.scss";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * AddedCentwiseFriend Functional Component
 * 
 * @returns {JSX.Element} The JSX representation of the AddedCentwiseFriend component.
 */
const AddedCentwiseFriend: React.FC = () => {
    // State to manage the friend's email address and the modal visibility
    const [email, setEmail] = useState<string>('');
    const [modal, setModal] = useState(true);

    // React Router navigate hook for programmatic navigation
    const navigate = useNavigate();

    // Ref to access the modal content div
    const modalContentRef = useRef<HTMLDivElement>(null);

    /**
     * Handle Form Submission
     * 
     * @description Function to handle the submission of the form.
     * If the email is empty, it displays an alert. Otherwise, it calls the addFriend function.
     */
    const handleFormSubmit = () => {
        if (email === '') {
            alert("Add Friend's email address");
        } else {
            addFriend(email);
        }
    }

    /**
     * Handle Close
     * 
     * @description Function to close the modal.
     */
    const handleClose = () => {
        setModal(false);
    };

    /**
     * Toggle Modal
     * 
     * @description Function to toggle the modal visibility.
     */
    const toggleModal = () => {
        setModal(!modal);
    }

    /**
     * Add Friend
     * 
     * @description Function to make an HTTP request to add the friend.
     * On success, it navigates the user to the friends page.
     * 
     * @param {string} email - The email address of the friend to be added.
     */
    const addFriend = async (email: string) => {
        try {
            // Make a request to the server to add the friend
            const response = await axios.post('/api/friends/addFriend', { email });

            // Log the response or handle it as needed
            console.log('Friend added successfully:', response.data);
            navigate('/friends');
        } catch (error: any) {
            // Handle errors, e.g., log them or show an error message to the user
            console.error('Error adding friend:', error.message);
        }
    };

    /**
     * Render function
     * 
     * @returns {JSX.Element} The JSX representation of the AddedCentwiseFriend component.
     */
    return (
        <>
            {modal && (
                <div ref={modalContentRef} className={styles.modal}>
                    {/* Overlay to close the modal */}
                    <div onClick={handleClose} className={styles.overlay}></div>
                    {/* Modal Content */}
                    <div className={styles.modalContent}>
                        <h3 className={styles.formHeading}>Add Friend</h3>
                        {/* Form to input friend's email address */}
                        <form onSubmit={handleFormSubmit}>
                            <input
                                className={styles.inputs}
                                type="text"
                                value={email}
                                placeholder="Enter email address"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <br />
                            {/* Button Group */}
                            <div className={styles.buttonGroup}>
                                {/* Add Friend Button */}
                                <button type="submit" className={styles.add}>
                                    Add Friend
                                </button>
                                {/* Cancel Button */}
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className={styles.cancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

// Exporting the AddedCentwiseFriend component as the default export
export default AddedCentwiseFriend;
