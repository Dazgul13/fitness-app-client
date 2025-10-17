# FitTracker - Comprehensive Fitness Tracking App

A modern, feature-rich fitness tracking application built with React, featuring a beautiful UI with light/dark theme support, comprehensive workout management, and an intuitive dashboard.

## ✨ Features

### 🎨 Dark Theme & Glassmorphism Design
- **Pure Dark Theme**: Sleek dark interface optimized for modern fitness tracking
- **Glassmorphism UI**: Modern frosted glass effect with backdrop blur on all cards and components
- **Dynamic Glass Effects**: Hover animations and interactive glass elements
- **Enhanced Contrast**: High contrast white text (#ffffff) with bold font weights for maximum readability
- **WCAG AA Compliance**: High contrast ratios meeting accessibility standards
- **Text Shadow Effects**: Subtle shadows for better text definition on glass surfaces
- **Mobile Optimized**: Dark theme optimized for mobile browsers with proper meta tags
- **Minimal CSS**: Clean, efficient styling at only 463 lines for optimal performance

### 🏋️ Workout Management
- **Add Workouts**: Create new workout entries with name, duration, and status
- **Track Progress**: Mark workouts as completed or pending
- **Workout Statistics**: View total workouts, completion rate, and time spent
- **Delete Functionality**: Remove individual workouts or clear all at once

### 📊 Dashboard & Analytics
- **Personal Dashboard**: Overview of your fitness journey with key metrics
- **Quick Stats**: Total workouts, completed sessions, time exercised, success rate
- **Recent Activity**: View your latest workout sessions
- **Motivational Content**: Encouraging messages based on your progress

### 🔐 User Authentication
- **Secure Login/Register**: User account management with validation
- **Protected Routes**: Secure access to personal fitness data
- **Session Management**: Persistent login with token-based authentication

### 🧭 Navigation & UX
- **Intuitive Navigation**: Fixed navbar with active page indicators
- **Quick Actions**: Easy access to frequently used features
- **Breadcrumb Navigation**: Clear page hierarchy and navigation
- **Loading States**: Smooth loading indicators for better UX

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fitness-app-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:4000
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Pages & Components

### Pages
- **Home**: Landing page with features overview and call-to-action
- **Dashboard**: Personal fitness overview with statistics and recent activity
- **Workouts**: Complete workout management with CRUD operations
- **Login/Register**: User authentication with form validation

### Components
- **AppNavbar**: Responsive navigation with theme toggle
- **WorkoutCard**: Individual workout display with actions
- **AddWorkoutModal**: Modal form for creating new workouts
- **Footer**: App footer with links and social media

### Context Providers
- **UserContext**: User authentication and session management
- **ThemeContext**: Light/dark theme state management

## 🎨 Theme System

The app features a comprehensive theme system with:

- **CSS Custom Properties**: Dynamic color variables for easy theme switching
- **Automatic Theme Persistence**: Your theme preference is saved locally
- **Smooth Transitions**: All theme changes are animated for better UX
- **Accessible Colors**: High contrast ratios for better readability

### Theme Variables
```css
/* Light Theme */
--primary: #6366f1
--bg-primary: #ffffff
--text-primary: #1e293b

/* Dark Theme */
--bg-primary: #0f172a
--text-primary: #f8fafc
```

## 🛠️ Technologies Used

- **React 19**: Latest React with hooks and context
- **React Router**: Client-side routing and navigation
- **React Bootstrap**: UI components and responsive grid
- **FontAwesome**: Icons and visual elements
- **CSS Custom Properties**: Dynamic theming system
- **Local Storage**: Theme and session persistence

## 📦 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AppNavbar.js    # Navigation bar
│   ├── WorkoutCard.js  # Workout display card
│   ├── AddWorkoutModal.js # Workout creation modal
│   └── Footer.js       # App footer
├── pages/              # Main application pages
│   ├── Home.js         # Landing page
│   ├── Dashboard.js    # User dashboard
│   ├── Workouts.js     # Workout management
│   ├── Login.js        # User login
│   └── Register.js     # User registration
├── context/            # React context providers
│   ├── UserContext.js  # User state management
│   └── ThemeContext.js # Theme state management
├── utils/              # Utility functions
│   ├── api.js          # API communication
│   └── notyf.js        # Notification system
├── App.js              # Main app component
├── App.css             # Global styles and themes
└── index.js            # App entry point
```

## 🎯 Key Features Implementation

### Theme Toggle
```javascript
const { theme, toggleTheme } = useContext(ThemeContext);
// Automatically applies theme to document body
// Persists preference in localStorage
```

### Workout Statistics
```javascript
const totalWorkouts = workouts.length;
const completedWorkouts = workouts.filter(w => w.status === 'completed').length;
const completionRate = Math.round((completedWorkouts / totalWorkouts) * 100);
```

### Responsive Design
- Mobile-first approach with Bootstrap grid system
- Flexible layouts that adapt to screen size
- Touch-friendly interface elements

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App

## 🌟 Future Enhancements

- **Analytics Dashboard**: Detailed progress charts and graphs
- **Goal Setting**: Set and track fitness goals
- **Social Features**: Share achievements with friends
- **Exercise Library**: Predefined workout templates
- **Calendar Integration**: Schedule and plan workouts
- **Export Data**: Download workout history

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Bootstrap team for the UI components
- FontAwesome for the beautiful icons
- All fitness enthusiasts who inspired this project

---

**Made with ❤️ for fitness enthusiasts everywhere!**

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
