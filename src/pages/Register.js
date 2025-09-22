import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
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

    // Redirect to workouts page if user is already logged in
    if (user.id !== null) {
        return <Navigate to="/workouts" />;
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card shadow-lg border-0 rounded-lg mt-4 mb-5" style={{ maxWidth: '500px', width: '100%' }}>
                <div className="card-header bg-primary text-white text-center py-4">
                    <h2 className="m-0 font-weight-bold">Create Account</h2>
                </div>
                <div className="card-body p-4 p-md-5">
                    <Form onSubmit={(e) => registerUser(e)}>
                        {/* Email Field */}
                        <Form.Group controlId="userEmail" className="mb-4">
                            <Form.Label className="fw-bold">Email address</Form.Label>
                            <div className="input-group">
                                <span className="input-group-text bg-light">
                                    <i className="fas fa-envelope"></i>
                                </span>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="py-2"
                                />
                            </div>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        {/* Password Field */}
                        <Form.Group controlId="password" className="mb-4">
                            <Form.Label className="fw-bold">Password</Form.Label>
                            <div className="input-group">
                                <span className="input-group-text bg-light">
                                    <i className="fas fa-lock"></i>
                                </span>
                                <Form.Control
                                    type="password"
                                    placeholder="Minimum 8 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength="8"
                                    className="py-2"
                                />
                            </div>
                            {password !== '' && password.length < 8 && (
                                <Form.Text className="text-danger">
                                    Password must be at least 8 characters long.
                                </Form.Text>
                            )}
                        </Form.Group>

                        {/* Confirm Password Field */}
                        <Form.Group controlId="confirmPassword" className="mb-4">
                            <Form.Label className="fw-bold">Confirm Password</Form.Label>
                            <div className="input-group">
                                <span className="input-group-text bg-light">
                                    <i className="fas fa-lock"></i>
                                </span>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="py-2"
                                />
                            </div>
                            {!passwordsMatch && confirmPassword !== '' && (
                                <Form.Text className="text-danger">
                                    Passwords do not match.
                                </Form.Text>
                            )}
                        </Form.Group>

                        {/* Submit Button */}
                        <div className="d-grid gap-2 mt-4 mb-3">
                            {isActive ?
                                <Button variant="primary" type="submit" id="submitBtn" size="lg" className="py-2">
                                    Create Account
                                </Button>
                                :
                                <Button variant="danger" type="submit" id="submitBtn" size="lg" className="py-2" disabled>
                                    Create Account
                                </Button>
                            }
                        </div>

                        {/* Login Link */}
                        <div className="text-center mt-3">
                            <p>
                                Already have an account? <Link to="/login" className="text-primary fw-bold">Login here</Link>
                            </p>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}