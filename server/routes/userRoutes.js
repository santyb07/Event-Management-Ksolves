const express = require('express');
const User = require('../models/User'); // Import the User model
const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send({ message: 'Server error' });
  }
});
