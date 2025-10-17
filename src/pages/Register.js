import { useState, useEffect, useContext } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import notyf from '../utils/notyf';

/**
 * Register Component
 *
 * User registration page with form validation
 * Allows new users to create an account
 */
export default function Register() {
    // Access user context
    const { user, API_URL } = useContext(UserContext);

    // State for form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // State for form validation
    const [isActive, setIsActive] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    /**
     * Register user function
     * Sends registration data to the server
     *
     * @param {Event} e - Form submission event
     */
    function registerUser(e) {
        // Prevent default form submission behavior
        e.preventDefault();

        // Validate email format
        if (!email.includes('@')) {
            notyf.error('Please enter a valid email address');
            return;
        }

        // Validate password length
        if (password.length < 8) {
            notyf.error('Password must be at least 8 characters long');
            return;
        }

        // Send registration request to backend
        fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then(async res => {
            const text = await res.text();
            // Try to parse JSON when possible
            let data = null;
            try { data = JSON.parse(text); } catch(e) { data = null; }

            if (res.ok) {
                // Registration usually returns 201
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                notyf.success((data && data.message) || 'Registration successful! You can now log in.');
            } else {
                const errMsg = (data && (data.error || data.message)) || text || 'Registration failed. Please try again.';
                notyf.error(errMsg);
            }
        })
        .catch(error => {
            console.error('Error during registration:', error);
            notyf.error('An error occurred during registration. Please try again.');
        });
    }

    // Effect for form validation
    useEffect(() => {
        // Check if passwords match
        if (password !== '' && confirmPassword !== '') {
            if (password === confirmPassword) {
                setPasswordsMatch(true);
            } else {
                setPasswordsMatch(false);
            }
        }

        // Enable submit button when all fields are filled and passwords match
        if (
            email !== '' &&
            password !== '' &&
            confirmPassword !== '' &&
            password === confirmPassword &&
            password.length >= 8
        ) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password, confirmPassword]);

    // Redirect to dashboard page if user is already logged in
    if (user.id !== null) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="auth-page py-5">
            <Container>
                <Row className="justify-content-center">
                    <Col lg={5} md={7} sm={9}>
                        <Card className="glass-card shadow-lg border-0">
                            <Card.Body className="p-5">
                                <div className="text-center mb-4">
                                    <div className="glass-feature-icon auth-icon mb-3" style={{width: '80px', height: '80px'}}>
                                        <i className="fas fa-user-plus fa-2x text-primary"></i>
                                    </div>
                                    <h2 className="fw-bold mb-2 text-high-contrast">Join FitTracker</h2>
                                    <p className="text-medium-contrast">Create your account and start your fitness journey</p>
                                </div>
                                
                                <Form onSubmit={(e) => registerUser(e)}>
                                    {/* Email Field */}
                                    <Form.Group controlId="userEmail" className="mb-3">
                                        <Form.Label className="fw-semibold">Email Address</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="fas fa-envelope"></i>
                                            </span>
                                            <Form.Control
                                                type="email"
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>

                                    {/* Password Field */}
                                    <Form.Group controlId="password" className="mb-3">
                                        <Form.Label className="fw-semibold">Password</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="fas fa-lock"></i>
                                            </span>
                                            <Form.Control
                                                type="password"
                                                placeholder="Minimum 8 characters"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                minLength="8"
                                            />
                                        </div>
                                        {password !== '' && password.length < 8 && (
                                            <Form.Text className="text-danger">
                                                <i className="fas fa-exclamation-triangle me-1"></i>
                                                Password must be at least 8 characters long.
                                            </Form.Text>
                                        )}
                                    </Form.Group>

                                    {/* Confirm Password Field */}
                                    <Form.Group controlId="confirmPassword" className="mb-4">
                                        <Form.Label className="fw-semibold">Confirm Password</Form.Label>
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <i className="fas fa-lock"></i>
                                            </span>
                                            <Form.Control
                                                type="password"
                                                placeholder="Confirm your password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        {!passwordsMatch && confirmPassword !== '' && (
                                            <Form.Text className="text-danger">
                                                <i className="fas fa-times-circle me-1"></i>
                                                Passwords do not match.
                                            </Form.Text>
                                        )}
                                        {passwordsMatch && confirmPassword !== '' && password !== '' && (
                                            <Form.Text className="text-success">
                                                <i className="fas fa-check-circle me-1"></i>
                                                Passwords match!
                                            </Form.Text>
                                        )}
                                    </Form.Group>

                                    {/* Submit Button */}
                                    <div className="d-grid mb-3">
                                        <Button 
                                            variant={isActive ? "primary" : "secondary"} 
                                            type="submit" 
                                            id="submitBtn" 
                                            size="lg" 
                                            disabled={!isActive}
                                            className="fw-semibold"
                                        >
                                            <i className="fas fa-user-plus me-2"></i>
                                            Create Account
                                        </Button>
                                    </div>
                                </Form>

                                {/* Login Link */}
                                <div className="text-center">
                                    <p className="text-medium-contrast mb-0">
                                        Already have an account? {' '}
                                        <Link to="/login" className="text-primary fw-semibold text-decoration-none">
                                            Sign in here
                                        </Link>
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}