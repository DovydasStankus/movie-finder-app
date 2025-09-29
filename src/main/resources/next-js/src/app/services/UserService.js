const API_BASE_URL = 'http://localhost:8080/api/v1/users'; // adjust the path as needed

export const UserService = {
  
  // Fetch all users
  getAllUsers: async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Fetch a user by ID
  getUserById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user with id ${id}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  },

  // create and update are same
  // Create a new user
  createUser: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  loginUser: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  logoutUser: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  },

  // Update an existing user
  updateUser: async (id, userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error(`Failed to update user with id ${id}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  },

  // Delete a user
  deleteUser: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete user with id ${id}`);
      }
      return { message: 'User deleted successfully' };
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  },
};