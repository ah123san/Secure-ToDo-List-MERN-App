require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes'); // 1. Naya Task Route import kiya

// Connect to Database
connectDB();

const app = express();

// Global Middlewares
app.use(express.json()); 
app.use(cors()); 

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes); // 2. Task API ko yahan link kar diya

// Basic Test Route
app.get('/', (req, res) => {
    res.send('Secure To-Do App Backend is Running perfectly!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});