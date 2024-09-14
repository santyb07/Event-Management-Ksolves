# Event Management Application

## Description
The Event Management Application is a web-based platform designed to help users create, manage, and RSVP to events. This application allows users to send reminders to attendees via email, ensuring that everyone stays informed about upcoming events.

## Features
- User authentication (registration and login)
- Create, update, and delete events
- RSVP functionality for attendees
- Email reminders sent to attendees before the event
- View a list of all events
- Responsive design for mobile and desktop users

## Technologies Used
- **Frontend**: React.js, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Email Service**: Nodemailer (Gmail)
- **Task Scheduler**: cron package for scheduling email reminders

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- A Gmail account (for sending emails)

### Clone the Repository
```bash
git clone https://github.com/yourusername/event-management-app.git
cd event-management-app

Install Dependencies
Navigate to both the server and client directories and install the necessary dependencies.
Server
cd server
npm install

Client

bash
cd client
npm install

Configure Environment Variables
Create a .env file in the server directory and add the following variables:

text
USERNAME=your_mongo_db_username
PASSWORD=your_mongo_db_password
EMAIL=your_email@gmail.com
EMAIL_PASSWORD=your_email_password

Start the Application

    Start the MongoDB server (if running locally).
    Start the backend server:

bash
cd server
node index.js

    Start the frontend development server:

bash
cd client
npm start

Usage

    Navigate to http://localhost:3000 in your browser to access the application.
    Register a new account or log in with an existing account.
    Create new events, view existing events, and RSVP to events.
    The cron job will automatically send email reminders to attendees one hour before the event.

Cron Job Setup
To ensure that email reminders are sent, a cron job is set up to run every hour. The cron job is defined in the reminderJob.js file.
Running the Cron Job
To run the cron job:

bash
node reminderJob.js



