const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Defining User Schema for registration and login with SaaS features
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    // [NEW FEATURE] Role-Based Access Control (RBAC) for SaaS Application
    // Differentiates between regular users, premium members, and the system administrator
    role: {
        type: String,
        enum: ['free', 'premium', 'admin'],
        default: 'free' // All new signups are 'free' tier by default
    },
    // [NEW FEATURE] Monetization Logic Counter
    // Tracks the number of tasks created by a 'free' tier user to enforce limits
    taskCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true }); 

// Hash password before saving to the database (Security Best Practice)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare entered password with hashed password in DB
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;