import axios from 'axios';

export const apiPost = async (url, data = {}) => {
    try {
        return await axios.post(url, data);
    }catch (error) {
        alert('An error occurred GG while making the request.');
        throw error;
    }
}

// Function to fetch unread notifications
export const fetchUnreadNotifications = async () => {
    try {
        const response = await axios.get('/api/notifications/unread');
        return response.data;
    } catch (error) {
        console.error('Error fetching unread notifications:', error);
        return [];
    }
};

// Function to mark new uploads as read and show following feed
export const showNewUploads = async () => {
    try {
        await axios.post('/api/notifications/read');
        return []; // Return empty array after marking notifications as read
    } catch (error) {
        console.error('Error marking notifications as read:', error);
        return [];
    }
};

// Function to perform search for recipes or users
export const performSearch = async (searchQuery, searchType) => {
    try {
        const response = await axios.get('/search', { // Make sure this is a GET request
            params: {
                query: searchQuery,
                type: searchType
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error performing search:', error);
        return {
            recipes: { data: [] },
            users: { data: [] }
        };
    }
};



