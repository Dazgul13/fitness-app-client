import React, { useContext } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

/**
 * Home Page Component
 * 
 * Landing page with highlights and features of the fitness tracking app
 */
const Home = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const features = [
    {
      icon: 'fas fa-dumbbell',
      title: 'Track Workouts',
      description: 'Log your daily workouts and monitor your progress over time.',
      color: 'primary'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Progress Analytics',
      description: 'Visualize your fitness journey with detailed progress tracking.',
      color: 'success'
    },
    {
      icon: 'fas fa-target',
      title: 'Set Goals',
      description: 'Define your fitness goals and stay motivated to achieve them.',
      color: 'warning'
    },
    {
      icon: 'fas fa-users',
      title: 'Community',
      description: 'Connect with other fitness enthusiasts and share your achievements.',
      color: 'info'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users', icon: 'fas fa-users' },
    { number: '50K+', label: 'Workouts Logged', icon: 'fas fa-dumbbell' },
    { number: '95%', label: 'Goal Achievement', icon: 'fas fa-trophy' },
    { number: '24/7', label: 'Support', icon: 'fas fa-headset' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section py-5 mb-5">
        <Container>
          <Row className="align-items-center min-vh-75">
            <Col lg={6} md={12} className="text-center text-lg-start">
              <h1 className="display-3 fw-bold mb-4 gradient-text text-high-contrast">
                Transform Your Fitness Journey
              </h1>
              <p className="lead mb-4 text-medium-contrast">
                Track workouts, monitor progress, and achieve your fitness goals with our comprehensive fitness tracking platform.
              </p>
              <div className="hero-buttons">
                {user.id ? (
                  <>
                    <Button
                      as={Link}
                      to="/dashboard"
                      variant="primary"
                      size="lg"
                      className="me-3 mb-3 px-4 py-3"
                    >
                      <i className="fas fa-tachometer-alt me-2"></i>
                      Go to Dashboard
                    </Button>
                    <Button
                      as={Link}
                      to="/workouts"
                      variant="outline-primary"
                      size="lg"
                      className="mb-3 px-4 py-3"
                    >
                      <i className="fas fa-dumbbell me-2"></i>
                      View Workouts
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      as={Link}
                      to="/register"
                      variant="primary"
                      size="lg"
                      className="me-3 mb-3 px-4 py-3"
                    >
                      <i className="fas fa-rocket me-2"></i>
                      Get Started
                    </Button>
                    <Button
                      as={Link}
                      to="/login"
                      variant="outline-primary"
                      size="lg"
                      className="mb-3 px-4 py-3"
                    >
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Sign In
                    </Button>
                  </>
                )}
              </div>
            </Col>
            <Col lg={6} md={12} className="text-center">
              <div className="hero-image-container">
                <div className="glass-hero-placeholder hero-placeholder">
                  <div className="placeholder-content">
                    <i className="fas fa-chart-line fa-5x text-primary mb-3"></i>
                    <h4 className="text-primary text-high-contrast">Fitness Dashboard</h4>
                    <p className="text-medium-contrast">Track your progress with beautiful charts and analytics</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5 mb-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold mb-3 text-high-contrast">Why Choose FitTracker?</h2>
              <p className="lead text-medium-contrast">
                Discover the features that make our platform the perfect companion for your fitness journey.
              </p>
            </Col>
          </Row>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <Card className="h-100 glass-feature-card border-0">
                  <Card.Body className="text-center p-4">
                    <div className={`glass-feature-icon text-${feature.color}`}>
                      <i className={`${feature.icon} fa-2x`}></i>
                    </div>
                    <Card.Title className="h5 mb-3 text-high-contrast">{feature.title}</Card.Title>
                    <Card.Text className="text-medium-contrast">
                      {feature.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-5 mb-5">
        <Container>
          <div className="glass-stats-section rounded-4 py-5">
            <Row className="text-center">
              {stats.map((stat, index) => (
                <Col lg={3} md={6} key={index} className="mb-4">
                  <div className="stat-item">
                    <div className="stat-icon mb-3">
                      <i className={`${stat.icon} fa-2x text-white`}></i>
                    </div>
                    <h3 className="stat-number fw-bold mb-2">{stat.number}</h3>
                    <p className="stat-label mb-0">{stat.label}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </section>



      {/* CTA Section */}
      {!user.id && (
        <section className="cta-section py-5">
          <Container>
            <Row className="text-center">
              <Col lg={8} className="mx-auto">
                <Card className="glass-cta-card border-0 shadow-lg">
                  <Card.Body className="p-5">
                    <h3 className="display-6 fw-bold mb-3 text-high-contrast">Ready to Start Your Journey?</h3>
                    <p className="lead text-medium-contrast mb-4">
                      Join thousands of users who have transformed their fitness with our platform.
                    </p>
                    <Button
                      as={Link}
                      to="/register"
                      variant="primary"
                      size="lg"
                      className="px-5 py-3"
                    >
                      <i className="fas fa-user-plus me-2"></i>
                      Create Free Account
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      )}
    </div>
  );
};

export default Home;