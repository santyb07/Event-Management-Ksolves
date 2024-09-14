const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User'); // Import the User model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const router = express.Router();


// Create an event
router.post('/events', async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.status(201).send(event);
});


// Get all events
router.get('/events', async (req, res) => {
  const events = await Event.find();
  res.send(events);
});

// Fetch event details by ID
router.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id); // Find event by ID

    // Check if the event was found
    if (!event) {
      return res.status(404).send({ message: 'Event not found' });
    }

    res.send(event); // Send the event details as a response
  } catch (error) {
    console.error('Error fetching event details:', error);
    res.status(500).send({ message: 'Server error' });
  }
});


// Update an event
router.put('/events/:id', async (req, res) => {
    try {
      const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      // Check if the event was found and updated
      if (!event) {
        return res.status(404).send({ message: 'Event not found' });
      }
  
      res.send(event);
    } catch (error) {
      console.error('Error updating event:', error);
      res.status(500).send({ message: 'Server error' });
    }
  });
  

// Delete an event
router.delete('/events/:id', async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.status(204).send();
});


// User registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already in use. Please use a different email.' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send({ message: 'Server error' });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: 'Invalid email or password.' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid email or password.' });
    }

    // If login is successful, return user details (omit password)
    res.send({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send({ message: 'Server error' });
  }
});


// RSVP endpoint
router.post('/events/:id/rsvp', async (req, res) => {
  const { userId, response } = req.body; // Expecting userId and response in the request body

  try {
    // Validate input
    if (!userId || !response) {
      return res.status(400).send({ message: 'userId and response are required.' });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send({ message: 'Event not found' });
    }

    // Ensure attendees is initialized
    if (!Array.isArray(event.attendees)) {
      event.attendees = [];
    }

    // Check if the user already RSVP'd
    const existingRSVP = event.attendees.find(attendee => attendee && attendee.userId && attendee.userId.toString() === userId);
    if (existingRSVP) {
      // Update the existing RSVP
      existingRSVP.response = response;
    } else {
      // Add a new RSVP
      event.attendees.push({ userId, response });
    }

    await event.save();
    res.send({ message: 'RSVP recorded successfully', attendees: event.attendees });
  } catch (error) {
    console.error('Error processing RSVP:', error);
    res.status(500).send({ message: 'Server error', error: error.message });
  }
});

module.exports = router;