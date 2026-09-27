const Task = require('../models/Task');
const User = require('../models/User'); 

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createTask = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).json({ message: 'Please provide a task title' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 💎 INDUSTRY STANDARD FIX: Count directly from Task Database (No Crashing)
        const taskCount = await Task.countDocuments({ user: req.user.id });
        
        if (user.role === 'free' && taskCount >= 5) {
            return res.status(403).json({ 
                message: 'Task limit reached. Upgrade to Premium to unlock unlimited tasks.',
                code: 'PAYWALL_TRIGGER' 
            });
        }

        // Create the task cleanly
        const task = await Task.create({
            title: req.body.title,
            user: req.user.id
        });

        // WE ARE NOT SAVING THE USER MODEL ANYMORE. THIS WAS CAUSING THE ERROR!
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const updates = {};
        if (Object.hasOwn(req.body, 'title')) {
            if (typeof req.body.title !== 'string' || !req.body.title.trim()) {
                return res.status(400).json({ message: 'Please provide a task title' });
            }
            updates.title = req.body.title.trim();
        }
        if (Object.hasOwn(req.body, 'completed')) {
            if (typeof req.body.completed !== 'boolean') {
                return res.status(400).json({ message: 'Completed must be true or false' });
            }
            updates.completed = req.body.completed;
        }
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: 'No valid task fields provided' });
        }

        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { $set: updates },
            { new: true, runValidators: true }
        );
        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
        return res.status(200).json(updatedTask);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (task.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await task.deleteOne();
        res.status(200).json({ id: req.params.id, message: 'Task removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };