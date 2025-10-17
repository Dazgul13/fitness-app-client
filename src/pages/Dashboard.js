import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

/**
 * Dashboard Component
 * 
 * Main dashboard showing user's fitness overview and quick actions
 */
const Dashboard = () => {
  const { user, API_URL } = useContext(UserContext);
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch workouts for dashboard stats
  useEffect(() => {
    if (user.id) {
      const token = localStorage.getItem('token');
      
      fetch(`${API_URL}/workouts/getMyWorkouts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.ok ? response.json() : Promise.reject('Failed to fetch'))
      .then(data => {
        const workoutsArray = Array.isArray(data.workouts) ? data.workouts : Array.isArray(data) ? data : [];
        setWorkouts(workoutsArray);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
        setIsLoading(false);
      });
    }
  }, [user.id, API_URL]);

  // Redirect to login if user is not logged in
  if (!user.id) {
    return <Navigate to="/login" />;
  }

  // Calculate stats
  const totalWorkouts = workouts.length;
  const completedWorkouts = workouts.filter(w => w.status?.toLowerCase() === 'completed').length;
  const totalMinutes = workouts.reduce((total, workout) => {
    const duration = parseInt(workout.duration) || 0;
    return total + duration;
  }, 0);
  const completionRate = totalWorkouts > 0 ? Math.round((completedWorkouts / totalWorkouts) * 100) : 0;

  // Get recent workouts (last 3)
  const recentWorkouts = workouts.slice(-3).reverse();

  const quickStats = [
    {
      title: 'Total Workouts',
      value: totalWorkouts,
      icon: 'fas fa-dumbbell',
      color: 'primary',
      description: 'Workouts logged'
    },
    {
      title: 'Completed',
      value: completedWorkouts,
      icon: 'fas fa-check-circle',
      color: 'success',
      description: 'Workouts finished'
    },
    {
      title: 'Total Time',
      value: `${totalMinutes}m`,
      icon: 'fas fa-clock',
      color: 'info',
      description: 'Minutes exercised'
    },
    {
      title: 'Success Rate',
      value: `${completionRate}%`,
      icon: 'fas fa-trophy',
      color: 'warning',
      description: 'Completion rate'
    }
  ];

  return (
    <div className="dashboard-page py-4">
      <Container>
        {/* Welcome Section */}
        <div className="welcome-section mb-5">
          <Row className="align-items-center">
            <Col>
              <h1 className="display-5 fw-bold gradient-text mb-2 text-high-contrast">
                Welcome to Your Fitness Dashboard
              </h1>
              <p className="lead text-medium-contrast">
                Here's an overview of your fitness journey and recent activity.
              </p>
            </Col>
          </Row>
        </div>

        {/* Quick Stats */}
        <Row className="mb-5">
          {quickStats.map((stat, index) => (
            <Col lg={3} md={6} key={index} className="mb-4">
              <Card className="glass-card stat-card h-100 border-0">
                <Card.Body className="text-center p-4">
                  <div className={`glass-feature-icon text-${stat.color} mb-3`} style={{width: '60px', height: '60px', fontSize: '1.5rem'}}>
                    <i className={`${stat.icon}`}></i>
                  </div>
                  <h3 className="stat-value fw-bold mb-2 text-high-contrast">{stat.value}</h3>
                  <h6 className="stat-title text-medium-contrast mb-1">{stat.title}</h6>
                  <p className="stat-description text-medium-contrast small mb-0">{stat.description}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Quick Actions and Theme Settings */}
        <Row className="mb-5">
          <Col lg={8}>
            <Card className="glass-card border-0">
              <Card.Header className="bg-transparent border-0 pt-4 px-4">
                <h4 className="mb-0 fw-bold text-high-contrast">Recent Workouts</h4>
              </Card.Header>
              <Card.Body className="px-4 pb-4">
                {isLoading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : recentWorkouts.length > 0 ? (
                  <div className="recent-workouts">
                    {recentWorkouts.map((workout, index) => (
                      <div key={workout._id} className="workout-item d-flex align-items-center py-3 border-bottom">
                        <div className="workout-icon me-3">
                          <i className="fas fa-dumbbell text-primary"></i>
                        </div>
                        <div className="workout-details flex-grow-1">
                          <h6 className="mb-1 fw-semibold">{workout.name}</h6>
                          <small className="text-muted">
                            {workout.duration} minutes • {new Date(workout.dateAdded).toLocaleDateString()}
                          </small>
                        </div>
                        <div className="workout-status">
                          <span className={`badge ${workout.status?.toLowerCase() === 'completed' ? 'bg-success' : 'bg-warning'}`}>
                            {workout.status}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="text-center mt-3">
                      <Button as={Link} to="/workouts" variant="outline-primary">
                        View All Workouts
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <i className="fas fa-dumbbell fa-3x text-muted mb-3"></i>
                    <h5 className="text-muted">No workouts yet</h5>
                    <p className="text-muted">Start your fitness journey by adding your first workout!</p>
                    <Button as={Link} to="/workouts" variant="primary">
                      Add Your First Workout
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={4}>
            <div className="mb-4">
              <Card className="glass-card border-0">
                <Card.Header className="bg-transparent border-0 pt-4 px-4">
                  <h4 className="mb-0 fw-bold text-high-contrast">Quick Actions</h4>
                </Card.Header>
                <Card.Body className="px-4 pb-4">
                  <div className="d-grid gap-3">
                    <Button as={Link} to="/workouts" variant="primary" size="lg">
                      <i className="fas fa-plus me-2"></i>
                      Add New Workout
                    </Button>
                    <Button as={Link} to="/workouts" variant="outline-primary" size="lg">
                      <i className="fas fa-list me-2"></i>
                      View All Workouts
                    </Button>
                    <Button variant="outline-secondary" size="lg" disabled>
                      <i className="fas fa-chart-bar me-2"></i>
                      Analytics (Coming Soon)
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
            

          </Col>
        </Row>

        {/* Motivational Section */}
        <Row>
          <Col>
            <Card className="motivation-card border-0 shadow-sm">
              <Card.Body className="text-center p-5">
                <div className="motivation-icon mb-3">
                  <i className="fas fa-fire fa-3x text-warning"></i>
                </div>
                <h3 className="fw-bold mb-3">Keep Up the Great Work!</h3>
                <p className="lead text-muted mb-4">
                  {completionRate >= 80 
                    ? "You're crushing your fitness goals! Your dedication is paying off."
                    : completionRate >= 50
                    ? "You're making good progress! Stay consistent to reach your goals."
                    : "Every workout counts! Start building your fitness habit today."
                  }
                </p>
                <Button as={Link} to="/workouts" variant="primary" size="lg">
                  <i className="fas fa-rocket me-2"></i>
                  Continue Your Journey
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;