const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/userController');

// Jab frontend se /register par POST request aayegi, to registerUser wala function chalega
router.post('/register', registerUser);

// Jab frontend se /login par POST request aayegi, to authUser wala function chalega
router.post('/login', authUser);

module.exports = router;