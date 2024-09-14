const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cron = require("cron")
const Event = require('../models/Event'); // Import the Event model
const User = require('../models/User'); // Import the User model

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true });

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  service: 'gmail', // Use your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// Function to send email reminders
const sendEmailReminders = async () => {
  const now = new Date();
  const reminderTime = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now

  try {
    const events = await Event.find({
      date: { $gte: now, $lte: reminderTime },
    });

    for (const event of events) {
      // Fetch user details for each attendee
      const attendeePromises = event.attendees.map(async (attendee) => {
        const user = await User.findById(attendee.userId); // Fetch user details by ID
        return user; // Return user details
      });

      const attendeesDetails = await Promise.all(attendeePromises); // Wait for all user details to be fetched

      for (const user of attendeesDetails) {
        if (user) { // Ensure user exists
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email, // User's email
            subject: `Reminder: ${event.name} is coming up!`,
            text: `Hi ${user.name},\n\nThis is a reminder that the event "${event.name}" is scheduled for ${new Date(event.date).toLocaleString()}.\n\nLocation: ${event.location}\n\nBest regards,\nYour Event Management Team`,
          };

          await transporter.sendMail(mailOptions);
          console.log(`Email sent to ${user.email}`);
        }
      }
    }
  } catch (error) {
    console.error('Error sending email reminders:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Execute the function
sendEmailReminders();


// Set up the cron job
const job = new cron.CronJob(
  '0 * * * *', // Every hour at minute 0
  function () {
    console.log('Sending email reminders...');
    sendEmailReminders();
  },
  null, // onComplete
  true, // start
);

// Start the cron job
job.start();
console.log('Cron job started.');

// Handle process termination
process.on('SIGINT', () => {
  job.stop();
  mongoose.connection.close();
  console.log('Cron job stopped and database connection closed.');
  process.exit();
});
