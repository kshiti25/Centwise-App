// Importing necessary modules and services
import * as dashboardServices from '../services/dashboard-services.js';

// Fetch all data for the authenticated user
export const fetchAllData = async function(request, response) {
    try {
        // Check if the user is authenticated
        if (request.isAuthenticated()) {
            const userId = request.user._id;
            // Fetch user data using the dashboard service
            const userData = await dashboardServices.fetchUserData(userId);

            // Check if user data is found
            if (!userData) {
                return response.status(404).json({ error: 'User not found' });
            } else {
                // Return the user data as JSON
                return response.json(userData);
            }
        } else {
            // Redirect to the sign-in page if not authenticated
            return response.redirect('/api/user/signin');
        }
    } catch (error) {
        // Handle errors
        console.error('Fetch all data method', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};

// Fetch details of the authenticated user
export const userDetails = async function(request, response) {
    try {
        // Check if the user is authenticated
        if (request.isAuthenticated()) {
            const userId = request.user._id;
            // Fetch user data using the dashboard service
            const userData = await dashboardServices.fetchUserData(userId);

            // Check if user data is found
            if (!userData) {
                return response.status(404).json({ error: 'User not found' });
            } else {
                // Return the user data as JSON
                return response.json(userData);
            }
        } else {
            // Return a status and message if user is not authenticated
            return response.status(400).send('Details not found');
        }
    } catch (error) {
        // Handle errors
        console.error('Fetch all data method', error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update user profile for the specified user ID
export const updateUserProfile = async function(request, response) {
    try {
        // Extract user ID and updated data from the request
        const userId = request.params.userId;
        const updatedData = request.body;

        // Update user data using the dashboard service
        const updatedUserData = await dashboardServices.updateUserData(userId, updatedData);

        // Check if user data is updated successfully
        if (!updatedUserData) {
            return response.status(404).json({ success: false, error: 'User not found' });
        }

        // Return success status and updated user data as JSON
        return response.status(200).json({ success: true, data: updatedUserData });
    } catch (error) {
        // Handle errors
        console.error('Error updating user profile:', error);
        response.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};
