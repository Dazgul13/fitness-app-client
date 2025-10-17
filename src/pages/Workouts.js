import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import notyf from '../utils/notyf';
import WorkoutCard from '../components/WorkoutCard';
import AddWorkoutModal from '../components/AddWorkoutModal';

/**
 * Workouts Page Component
 * 
 * Main page for displaying and managing user workouts
 * Includes functionality to view, add, and manage workouts
 */
export default function Workouts() {
  // using shared notyf instance
  
  // Access user context
  const { user, API_URL } = useContext(UserContext);
  
  // State for workouts data
  const [workouts, setWorkouts] = useState([]);
  
  // State for loading status
  const [isLoading, setIsLoading] = useState(true);
  
  // State for modal visibility
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Handle modal open/close
  const handleCloseModal = () => setShowAddModal(false);
  const handleShowModal = () => setShowAddModal(true);

  // Delete all workouts (with confirmation)
  const handleDeleteAll = () => {
    if (!workouts || workouts.length === 0) {
      notyf.info('No workouts to delete');
      return;
    }

    const ok = window.confirm('Are you sure you want to delete ALL workouts? This action cannot be undone.');
    if (!ok) return;

    const token = localStorage.getItem('token');
    if (!token) {
      notyf.error('You must be logged in to delete workouts');
      return;
    }

    setIsLoading(true);

    // Delete each workout via the API
    Promise.all(workouts.map(w => {
      return fetch(`${API_URL}/workouts/deleteWorkout/${w._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(res => {
        if (!res.ok) {
          throw new Error('Failed to delete');
        }
        return res.json().catch(() => ({}));
      });
    }))
    .then(() => {
      notyf.success('All workouts deleted');
      fetchWorkouts();
    })
    .catch(err => {
      console.error('Error deleting workouts:', err);
      notyf.error('Failed to delete some workouts. Please try again.');
      fetchWorkouts();
    })
    .finally(() => setIsLoading(false));
  };
  
  /**
   * Fetch workouts from the API
   * This function is called on component mount and after adding a new workout
   */
  const fetchWorkouts = () => {
    setIsLoading(true);
    
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // Fetch workouts from API
    fetch(`${API_URL}/workouts/getMyWorkouts`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch workouts');
      }
      return response.json();
    })
    .then(data => {
      // Always set workouts as an array
      let workoutsArray = [];
      if (Array.isArray(data.workouts)) {
        workoutsArray = data.workouts;
      } else if (Array.isArray(data)) {
        workoutsArray = data;
      }
      setWorkouts(workoutsArray);
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error fetching workouts:', error);
      notyf.error('Failed to load workouts. Please try again.');
      setIsLoading(false);
    });
  };
  
  // Fetch workouts on component mount
  useEffect(() => {
    // Only fetch if user is logged in
    if (user.id) {
      fetchWorkouts();
    }
  }, [user.id]);
  
  // Redirect to login if user is not logged in
  if (!user.id) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="workouts-page py-4">
      <Container>
        {/* Header Section */}
        <div className="glass-card header-section mb-4">
          <Row className="align-items-center">
            <Col lg={8} md={7} xs={12}>
              <h1 className="display-4 fw-bold gradient-text mb-3 text-high-contrast">My Workouts</h1>
              <p className="lead text-medium-contrast">
                Track your fitness journey and stay motivated with your workout log.
              </p>
            </Col>
            <Col lg={4} md={5} xs={12} className="text-md-end text-center mt-md-0 mt-3">
              <Button
                variant="primary"
                size="lg"
                onClick={handleShowModal}
                id="addWorkout" // Required ID as per specifications
                className="px-4 py-2 shadow-sm me-2 mb-2"
              >
                <i className="fas fa-plus me-2"></i>
                Add Workout
              </Button>
              <Button
                variant="outline-danger"
                size="lg"
                onClick={handleDeleteAll}
                id="deleteAllWorkouts"
                className="px-3 py-2 shadow-sm mb-2"
              >
                <i className="fas fa-trash me-2"></i>
                Delete All
              </Button>
            </Col>
          </Row>
        </div>

        {/* Workout Statistics */}
        {workouts.length > 0 && !isLoading && (
          <div className="glass-stats-section workout-stats mb-4 rounded-4">
            <Row>
              <Col md={3} sm={6} className="mb-3 mb-md-0">
                <div className="stat-item">
                  <div className="stat-number">{workouts.length}</div>
                  <div className="stat-label">Total Workouts</div>
                </div>
              </Col>
              <Col md={3} sm={6} className="mb-3 mb-md-0">
                <div className="stat-item">
                  <div className="stat-number">
                    {workouts.filter(w => w.status?.toLowerCase() === 'completed').length}
                  </div>
                  <div className="stat-label">Completed</div>
                </div>
              </Col>
              <Col md={3} sm={6} className="mb-3 mb-md-0">
                <div className="stat-item">
                  <div className="stat-number">
                    {workouts.reduce((total, workout) => {
                      const duration = parseInt(workout.duration) || 0;
                      return total + duration;
                    }, 0)}
                  </div>
                  <div className="stat-label">Total Minutes</div>
                </div>
              </Col>
              <Col md={3} sm={6}>
                <div className="stat-item">
                  <div className="stat-number">
                    {workouts.length > 0 ? 
                      Math.round((workouts.filter(w => w.status?.toLowerCase() === 'completed').length / workouts.length) * 100) 
                      : 0}%
                  </div>
                  <div className="stat-label">Completion Rate</div>
                </div>
              </Col>
            </Row>
          </div>
        )}
        
        {/* Workouts Display */}
        <div className="workouts-container">
          {isLoading ? (
            // Loading spinner
            <div className="text-center py-5">
              <Spinner animation="border" role="status" className="me-2">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <span className="ms-2 text-muted">Loading your workouts...</span>
            </div>
          ) : workouts.length === 0 ? (
            // No workouts message
            <div className="text-center py-5 empty-state">
              <div className="mb-4">
                <i className="fas fa-dumbbell fa-4x text-muted"></i>
              </div>
              <h3 className="mb-3">No workouts found</h3>
              <p className="text-muted mb-4">Start tracking your fitness journey by adding your first workout!</p>
              <Button
                variant="outline-primary"
                onClick={handleShowModal}
                className="px-4"
              >
                <i className="fas fa-plus me-2"></i>
                Add Your First Workout
              </Button>
            </div>
          ) : (
            // Display workout cards with animation
            <Row className="g-4">
              {workouts.map((workout, index) => (
                <Col
                  key={workout._id}
                  xs={12} sm={6} lg={4}
                  className="mb-4 fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <WorkoutCard workout={workout} fetchWorkouts={fetchWorkouts} API_URL={API_URL} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Container>
      
      {/* Add Workout Modal */}
      <AddWorkoutModal
        show={showAddModal}
        handleClose={handleCloseModal}
        fetchWorkouts={fetchWorkouts}
      />
    </div>
  );
}