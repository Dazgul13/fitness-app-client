import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';

// Import pages
import Login from './pages/Login';
import Register from './pages/Register';
import Workouts from './pages/Workouts';

// Import components
import AppNavbar from './components/AppNavbar';

// Import context provider
import { UserProvider } from './context/UserContext';

/**
 * App Component
 *
 * Main application component that sets up routing and context providers
 */
function App() {
  return (
    <UserProvider>
      <Router>
        {/* Navigation Bar */}
        <AppNavbar />
        
        <Container>
          <Routes>
            {/* Redirect root to workouts page */}
            <Route path="/" element={<Navigate to="/workouts" />} />
            
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Main Application Routes */}
            <Route path="/workouts" element={<Workouts />} />
            
            {/* Fallback route - redirect to workouts */}
            <Route path="*" element={<Navigate to="/workouts" />} />
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;