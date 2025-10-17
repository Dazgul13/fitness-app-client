import { useState, useEffect, useContext } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import notyf from '../utils/notyf';

export default function Login() {
		// using shared notyf instance
	const navigate = useNavigate();
	const { user, setUser, API_URL } = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isActive, setIsActive] = useState(true);

	function authenticate(e) {
		e.preventDefault();
		fetch(`${API_URL}/users/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		})
			.then(res => res.ok ? res.json() : res.text().then(txt => { throw new Error(txt || 'Login failed'); }))
			.then(data => {
				if (data && data.access) {
					localStorage.setItem('token', data.access);
					retrieveUserDetails(data.access);
					setEmail(''); setPassword('');
					notyf.success('Successful Login');
				} else {
					notyf.error((data && (data.error || data.message)) || 'User not found. Try again.');
				}
			})
			.catch(err => {
				if (process.env.NODE_ENV !== 'production') console.error('Login error:', err);
				notyf.error('Login failed. Please try again.');
			});
	}

	const retrieveUserDetails = (token) => {
		fetch(`${API_URL}/users/details`, { headers: { Authorization: `Bearer ${token}` } })
			.then(res => res.ok ? res.json() : res.text().then(txt => { throw new Error(txt || 'Failed retrieving user details'); }))
			.then(data => {
				const userObj = data && data.user ? data.user : data;
				if (userObj && userObj._id) {
					setUser({ id: userObj._id, isAdmin: userObj.isAdmin });
					navigate('/dashboard');
				} else {
					throw new Error('Malformed user details response');
				}
			})
			.catch(err => {
				if (process.env.NODE_ENV !== 'production') console.error('Error retrieving user details:', err);
				notyf.error('Failed retrieving user details. Please try again.');
			});
	};

	useEffect(() => { setIsActive(email !== '' && password !== ''); }, [email, password]);

	return (
		<div className="auth-page py-5">
			<Container>
				<Row className="justify-content-center">
					<Col lg={5} md={7} sm={9}>
						<Card className="glass-card shadow-lg border-0">
							<Card.Body className="p-5">
								<div className="text-center mb-4">
									<div className="glass-feature-icon auth-icon mb-3" style={{width: '80px', height: '80px'}}>
										<i className="fas fa-sign-in-alt fa-2x text-primary"></i>
									</div>
									<h2 className="fw-bold mb-2 text-high-contrast">Welcome Back</h2>
									<p className="text-medium-contrast">Sign in to continue your fitness journey</p>
								</div>
								
								<Form onSubmit={authenticate}>
									<Form.Group className="mb-3" controlId="userEmail">
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
									</Form.Group>
									
									<Form.Group className="mb-4" controlId="password">
										<Form.Label className="fw-semibold">Password</Form.Label>
										<div className="input-group">
											<span className="input-group-text">
												<i className="fas fa-lock"></i>
											</span>
											<Form.Control 
												type="password" 
												placeholder="Enter your password" 
												value={password} 
												onChange={(e) => setPassword(e.target.value)} 
												required 
											/>
										</div>
									</Form.Group>
									
									<div className="d-grid mb-3">
										<Button 
											variant={isActive ? "primary" : "secondary"} 
											type="submit" 
											disabled={!isActive}
											size="lg"
											className="fw-semibold"
										>
											<i className="fas fa-sign-in-alt me-2"></i>
											Sign In
										</Button>
									</div>
								</Form>
								
								<div className="text-center">
									<p className="text-medium-contrast mb-0">
										Don't have an account? {' '}
										<Link to="/register" className="text-primary fw-semibold text-decoration-none">
											Sign up here
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