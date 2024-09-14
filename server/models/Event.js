const mongoose = require('mongoose');

// Define the Event schema
const eventSchema = new mongoose.Schema({
  // Remove event_id and use the default _id field
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, // You can also use Date if you want to store time with date
    required: true,
  },
  location:{
    type:String,
    required:true
  },
  attendees: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
    response: { type: String, enum: ['attending', 'not attending', 'maybe'], default: 'maybe' }, // RSVP response
  }],
  reminder_sent: {
    type: Boolean,
    default: false, // Default value for reminder_sent
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create the Event model
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;



