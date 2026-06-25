import AdminPanel from './pages/AdminPanel';
import Pricing from './pages/Pricing';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Preserved your Toast notification system

// Layouts
import MainLayout from './components/MainLayout';

// Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="App font-sans text-gray-900">
        
        {/* Global Toaster setup with your custom styling preserved */}
        <Toaster 
          position="top-center" 
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
              fontWeight: 'bold',
            },
          }} 
        />

        <Routes>
          {/* Global Layout Wrapper containing the navigation and main content */}
          <Route path="/" element={<MainLayout />}>
            
            {/* The index route represents the default path "/" (Landing Page) */}
            <Route index element={<LandingPage />} />
            
            {/* Other child routes */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="admin" element={<AdminPanel />} />
            
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;