const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT and protect private routes
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from header
            token = req.headers.authorization.split(' ')[1];
            
            // Verify JWT token using secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Attach user data to request object (excluding password)
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            return next(); 
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// [NEW FEATURE] Admin Middleware for RBAC
// This explicitly checks if the authenticated user has the 'admin' role
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // User is admin, allow access to the route
    } else {
        res.status(403).json({ message: 'Access Denied: Not authorized as an administrator' });
    }
};

module.exports = { protect, admin };