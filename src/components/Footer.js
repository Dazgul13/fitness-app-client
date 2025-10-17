import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ThemeContext from '../context/ThemeContext';

/**
 * Footer Component
 * 
 * App footer with links and information
 */
const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer glass-card mt-auto">
      <Container>
        <Row className="py-4">
          <Col lg={4} md={6} className="mb-4 mb-lg-0">
            <div className="footer-brand mb-3">
              <h5 className="fw-bold">
                <i className="fas fa-dumbbell me-2 text-primary"></i>
                FitTracker
              </h5>
              <p className="text-muted mb-0">
                Your personal fitness companion for tracking workouts and achieving your health goals.
              </p>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-lg-0">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled footer-links">
              <li><Link to="/" className="text-muted">Home</Link></li>
              <li><Link to="/dashboard" className="text-muted">Dashboard</Link></li>
              <li><Link to="/workouts" className="text-muted">Workouts</Link></li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <h6 className="fw-bold mb-3">Features</h6>
            <ul className="list-unstyled footer-links">
              <li><span className="text-muted">Workout Tracking</span></li>
              <li><span className="text-muted">Progress Analytics</span></li>
              <li><span className="text-muted">Goal Setting</span></li>
              <li><span className="text-muted">Dark/Light Theme</span></li>
            </ul>
          </Col>
          
          <Col lg={3} md={6}>
            <h6 className="fw-bold mb-3">Connect</h6>
            <div className="social-links">
              <a href="#" className="social-link me-3" title="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link me-3" title="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link me-3" title="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link" title="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </Col>
        </Row>
        
        <hr className="footer-divider" />
        
        <Row className="py-3">
          <Col md={6} className="text-center text-md-start">
            <p className="text-muted mb-0">
              © {currentYear} FitTracker. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="text-muted mb-0">
              Made with <i className="fas fa-heart text-danger"></i> for fitness enthusiasts
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;