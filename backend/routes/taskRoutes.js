const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// Har route mein 'protect' lagaya hai. Is ka matlab hai pehley token check hoga, phir kaam hoga.
// Agar token nahi hoga, to middleware wahin se wapis bhej dega.

router.route('/')
    .get(protect, getTasks)      // Tasks read karney k liye
    .post(protect, createTask);  // Naya task bananey k liye

router.route('/:id')
    .put(protect, updateTask)    // Kisi makhsoos task ko update karney k liye
    .delete(protect, deleteTask); // Kisi makhsoos task ko delete karney k liye

module.exports = router;