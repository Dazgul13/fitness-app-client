import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import UserContext from '../context/UserContext';

/**
 * AppNavbar Component
 * 
 * Navigation bar component that adapts based on user authentication status
 * Provides links to different pages, theme toggle, and logout functionality
 */
const AppNavbar = () => {
  // Access user context
  const { user, unsetUser } = useContext(UserContext);

  // Use navigate for redirection after logout
  const navigate = useNavigate();
  const location = useLocation();

  // Handle logout
  const handleLogout = () => {
    // Clear user data and token
    unsetUser();

    // Redirect to home page
    navigate('/');
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="navbar-custom shadow-sm"
      fixed="top"
    >
      <Container>
        {/* Brand/Logo */}
        <Navbar.Brand as={Link} to="/" className="fw-bold brand-logo">
          <i className="fas fa-dumbbell me-2 text-primary"></i>
          FitTracker
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={location.pathname === '/' ? 'active' : ''}
            >
              <i className="fas fa-home me-1"></i>
              Home
            </Nav.Link>
            {user.id && (
              <>
                <Nav.Link
                  as={Link}
                  to="/dashboard"
                  className={location.pathname === '/dashboard' ? 'active' : ''}
                >
                  <i className="fas fa-tachometer-alt me-1"></i>
                  Dashboard
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/workouts"
                  className={location.pathname === '/workouts' ? 'active' : ''}
                >
                  <i className="fas fa-dumbbell me-1"></i>
                  My Workouts
                </Nav.Link>
              </>
            )}
          </Nav>

          <Nav className="align-items-center">

            {user.id ? (
              // Navigation for authenticated users
              <>
                <Nav.Link className="text-muted me-2">
                  <i className="fas fa-user-circle me-1"></i>
                  Welcome back!
                </Nav.Link>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  <i className="fas fa-sign-out-alt me-1"></i>
                  Logout
                </Button>
              </>
            ) : (
              // Navigation for unauthenticated users
              <>
                <Nav.Link as={Link} to="/login" className="me-2">
                  <i className="fas fa-sign-in-alt me-1"></i>
                  Login
                </Nav.Link>
                <Button
                  as={Link}
                  to="/register"
                  variant="primary"
                  size="sm"
                  className="signup-btn"
                >
                  <i className="fas fa-user-plus me-1"></i>
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;