import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
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
					navigate('/workouts');
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
		<Form onSubmit={authenticate}>
			<h1 className="my-5 text-center">Login</h1>
			<Form.Group controlId="userEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
			</Form.Group>
			<Form.Group controlId="password">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
			</Form.Group>
			<div className="mt-3">
				{isActive ? <Button variant="primary" type="submit">Submit</Button> : <Button variant="danger" type="submit" disabled>Submit</Button>}
			</div>
		</Form>
	);
	}