import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import UserContext from '../context/UserContext';
import notyf from '../utils/notyf';

/**
 * AddWorkoutModal Component
 *
 * A modal form for adding new workouts
 *
 * @param {Object} props - Component props
 * @param {boolean} props.show - Controls whether the modal is visible
 * @param {Function} props.handleClose - Function to close the modal
 * @param {Function} props.fetchWorkouts - Function to refresh the workouts list after adding
 */
const AddWorkoutModal = ({ show, handleClose, fetchWorkouts }) => {
  // using shared notyf instance
  
  // Access user context for API URL
  const { API_URL } = useContext(UserContext);
  
  // State for form fields
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [status, setStatus] = useState('pending');
  
  // State for form validation
  const [isFormValid, setIsFormValid] = useState(false);
  
  // Validate form whenever inputs change
  React.useEffect(() => {
    // Treat duration as a string (non-empty)
    if (name.trim() !== '' && duration.trim() !== '') {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [name, duration]);
  
  // Reset form fields
  const resetForm = () => {
    setName('');
    setDuration('');
    setStatus('pending');
    setIsFormValid(false);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create workout object
    const workoutData = {
      name: name,
      // send duration as a string per schema
      duration: duration,
      status: status
    };
    
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // Send POST request to add workout
    fetch(`${API_URL}/workouts/addWorkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(workoutData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add workout');
      }
      return response.json();
    })
    .then(data => {
      // Show success notification
      notyf.success('Workout added successfully!');
      
      // Reset form and close modal
      resetForm();
      handleClose();
      
      // Refresh workouts list
      fetchWorkouts();
    })
    .catch(error => {
      console.error('Error adding workout:', error);
      notyf.error('Failed to add workout. Please try again.');
    });
  };
  
  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <div className="modal-content glass-modal">
      <Modal.Header className="bg-primary text-white py-3">
        <Modal.Title className="fw-bold">
          <i className="fas fa-dumbbell me-2"></i>
          Add New Workout
        </Modal.Title>
        <Button variant="link" className="text-white close-button" onClick={handleClose}>
          <i className="fas fa-times"></i>
        </Button>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="px-4 py-4">
          {/* Workout Name Field */}
          <Form.Group className="mb-4" controlId="workoutName">
            <Form.Label className="fw-bold">Workout Name</Form.Label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="fas fa-dumbbell"></i>
              </span>
              <Form.Control
                type="text"
                placeholder="Enter workout name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="py-2"
              />
            </div>
          </Form.Group>
          
          {/* Duration Field */}
          <Form.Group className="mb-4" controlId="workoutDuration">
            <Form.Label className="fw-bold">Duration (minutes)</Form.Label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="fas fa-clock"></i>
              </span>
              <Form.Control
                type="text"
                placeholder="Enter duration (e.g. '30' or '30 min')"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                className="py-2"
              />
            </div>
          </Form.Group>
          
          {/* Status Field */}
          <Form.Group className="mb-4" controlId="workoutStatus">
            <Form.Label className="fw-bold">Status</Form.Label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <i className="fas fa-tasks"></i>
              </span>
              <Form.Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="py-2"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </div>
          </Form.Group>
        </Modal.Body>
        
        <Modal.Footer className="border-0 px-4 pb-4">
          <Button variant="outline-secondary" onClick={handleClose} className="px-4">
            <i className="fas fa-times me-2"></i>
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={!isFormValid}
            className="px-4"
          >
            <i className="fas fa-plus me-2"></i>
            Add Workout
          </Button>
        </Modal.Footer>
      </Form>
      </div>
    </Modal>
  );
};

export default AddWorkoutModal;