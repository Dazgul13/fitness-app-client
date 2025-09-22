import React, { createContext, useState, useEffect } from 'react';

// Create the UserContext
const UserContext = createContext();

// Create a UserProvider component to wrap the application
export const UserProvider = ({ children }) => {
  // Initialize user state
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  // API URL (use REACT_APP_API_URL if provided so devs can run backend on a different port)
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

  // Function to unset user (logout)
  const unsetUser = () => {
    localStorage.clear();
    setUser({
      id: null,
      isAdmin: null
    });
  };

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      fetch(`${API_URL}/users/details`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        if (!res.ok) {
          // Try to read text for better diagnostics but then unset the user
          return res.text().then(txt => { throw new Error(txt || 'Failed to fetch user details'); });
        }
        return res.json();
      })
      .then(data => {
        // Support both shapes: { user: { _id, ... } } or direct user object { _id, ... }
        const userObj = data && data.user ? data.user : data;
        if (userObj && userObj._id) {
          setUser({
            id: userObj._id,
            isAdmin: userObj.isAdmin
          });
        } else {
          // If response isn't what we expected, clear any stored token
          console.warn('Unexpected /users/details shape:', data);
          unsetUser();
        }
  })
      .catch(error => {
        // Provide clearer troubleshooting output in the browser console
        console.error(`Error fetching user details from ${API_URL}/users/details:`, error);
        console.info('Tip: ensure the backend API is running and accessible at the above URL, and that you have no firewall or proxy blocking requests.');
        unsetUser();
      });
    }
  }, []);

  // Provide the user context to the application
  return (
    <UserContext.Provider value={{ user, setUser, unsetUser, API_URL }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;