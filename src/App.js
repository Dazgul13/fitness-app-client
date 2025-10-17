import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css';

// Import pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Workouts from './pages/Workouts';

// Import components
import AppNavbar from './components/AppNavbar';
import Footer from './components/Footer';

// Import context providers
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';

/**
 * App Component
 *
 * Main application component that sets up routing and context providers
 */
function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          {/* Navigation Bar */}
          <AppNavbar />
          
          <div className="main-content">
            <Routes>
              {/* Home page */}
              <Route path="/" element={<Home />} />
              
              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Main Application Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/workouts" element={<Workouts />} />
              
              {/* Fallback route - redirect to home */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          
          <Footer />
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;