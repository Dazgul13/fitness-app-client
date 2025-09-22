import React from 'react';
import { Card, Badge, Row, Col, Button } from 'react-bootstrap';
import notyf from '../utils/notyf';

/**
 * WorkoutCard Component
 *
 * Displays an individual workout as a card with workout details
 * Enhanced with icons and improved styling
 *
 * @param {Object} props - Component props
 * @param {Object} props.workout - Workout data object
 * @param {string} props.workout._id - Unique identifier for the workout
 * @param {string} props.workout.name - Name of the workout
 * @param {number} props.workout.duration - Duration of the workout in minutes
 * @param {string} props.workout.dateAdded - Date when the workout was added
 * @param {string} props.workout.status - Status of the workout (completed, pending)
 */
const WorkoutCard = ({ workout, fetchWorkouts, API_URL }) => {
  // using shared notyf instance

  // Handle marking a workout as completed
  const handleComplete = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      notyf.error('You must be logged in to update workouts');
      return;
    }

    fetch(`${API_URL}/workouts/completeWorkoutStatus/${workout._id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to update workout status');
      return res.json();
    })
    .then(() => {
      notyf.success('Workout marked completed');
      // Refresh parent list if callback provided
      if (typeof fetchWorkouts === 'function') fetchWorkouts();
    })
    .catch(err => {
      console.error('Error updating workout status:', err);
      notyf.error('Failed to update workout status. Try again.');
    });
  };

  // Toggle status back to pending
  const handleRevertToPending = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      notyf.error('You must be logged in to update workouts');
      return;
    }

    // Call the generic update endpoint to set status
    fetch(`${API_URL}/workouts/updateWorkout/${workout._id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'pending' })
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to update workout status');
      return res.json();
    })
    .then(() => {
      notyf.success('Workout reverted to pending');
      if (typeof fetchWorkouts === 'function') fetchWorkouts();
    })
    .catch(err => {
      console.error('Error reverting workout status:', err);
      notyf.error('Failed to revert workout status. Try again.');
    });
  };

  // Delete this workout
  const handleDelete = () => {
    const ok = window.confirm('Are you sure you want to delete this workout?');
    if (!ok) return;

    const token = localStorage.getItem('token');
    if (!token) {
      notyf.error('You must be logged in to delete workouts');
      return;
    }

    fetch(`${API_URL}/workouts/deleteWorkout/${workout._id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      if (!res.ok) throw new Error('Failed to delete workout');
      return res.json().catch(() => ({}));
    })
    .then(() => {
      notyf.success('Workout deleted');
      if (typeof fetchWorkouts === 'function') fetchWorkouts();
    })
    .catch(err => {
      console.error('Error deleting workout:', err);
      notyf.error('Failed to delete workout. Try again.');
    });
  };
  // Format the date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Determine badge color based on status
  const getBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="mb-4 shadow-sm fade-in">
      <Card.Header className="bg-white border-bottom-0 pt-3">
        <Badge
          bg={getBadgeVariant(workout.status)}
          className="float-end px-3 py-2"
        >
          {workout.status}
        </Badge>
      </Card.Header>
      <Card.Body className="pt-0">
        {/* Workout Name with Icon */}
        <Card.Title className="d-flex align-items-center mb-3">
          <i className="fas fa-dumbbell me-2 text-primary"></i>
          {workout.name}
        </Card.Title>
        
        <Row className="mt-3">
          {/* Duration with Icon */}
          <Col xs={12} className="mb-2">
            <div className="d-flex align-items-center">
              <i className="fas fa-clock me-2 text-secondary"></i>
              <span><strong>Duration:</strong> {workout.duration} minutes</span>
            </div>
          </Col>
          
          {/* Date with Icon */}
          <Col xs={12}>
            <div className="d-flex align-items-center">
              <i className="fas fa-calendar-alt me-2 text-secondary"></i>
              <span><strong>Date Added:</strong> {formatDate(workout.dateAdded)}</span>
            </div>
          </Col>
        </Row>

        {/* Action row: mark as completed when pending */}
        <Row className="mt-3">
          <Col xs={12} className="text-end">
            {workout.status && workout.status.toLowerCase() !== 'completed' ? (
              <>
                <Button
                  variant="success"
                  size="sm"
                  onClick={handleComplete}
                  id={`complete-${workout._id}`}
                  className="me-2"
                >
                  Mark Completed
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleDelete}
                  id={`delete-${workout._id}`}
                >
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Badge bg="success" className="px-3 py-2 me-2">Completed</Badge>
                <>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleRevertToPending}
                    id={`revert-${workout._id}`}
                    className="me-2"
                  >
                    Revert to Pending
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleDelete}
                    id={`delete-${workout._id}`}
                  >
                    Delete
                  </Button>
                </>
              </>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default WorkoutCard;