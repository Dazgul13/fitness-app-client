import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

/**
 * AppNavbar Component
 * 
 * Navigation bar component that adapts based on user authentication status
 * Provides links to different pages and logout functionality
 */
const AppNavbar = () => {
  // Access user context
  const { user, unsetUser } = useContext(UserContext);
  
  // Use navigate for redirection after logout
  const navigate = useNavigate();
  
  // Handle logout
  const handleLogout = () => {
    // Clear user data and token
    unsetUser();
    
    // Redirect to login page
    navigate('/login');
  };
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        {/* Brand/Logo */}
        <Navbar.Brand as={Link} to="/">
          Fitness Tracker
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user.id ? (
              // Navigation for authenticated users
              <>
                <Nav.Link as={Link} to="/workouts">
                  My Workouts
                </Nav.Link>
                <Button 
                  variant="outline-light" 
                  onClick={handleLogout}
                  className="ms-2"
                >
                  Logout
                </Button>
              </>
            ) : (
              // Navigation for unauthenticated users
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;