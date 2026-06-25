const express = require('express');
const router = express.Router();
const { registerUser, authUser, getAllUsers } = require('../controllers/userController');

// Assume your auth middleware is in a middleware folder. 
// If your folder structure is different, please update the path below.
const { protect, admin } = require('../middleware/authMiddleware'); 

// Standard User Routes
// Handles user registration
router.post('/register', registerUser);

// Handles user login and token generation
router.post('/login', authUser);

// [NEW] Secure Admin Routes
// Strictly protected route: Requires valid JWT (protect) AND Admin role (admin)
// Fetches all users for the admin dashboard
router.get('/admin/users', protect, admin, getAllUsers);

module.exports = router;