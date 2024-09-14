import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Event Management System</h1>
      <p className="home-description">
        Manage your events efficiently and effortlessly. Create, view, and manage your events all in one place.
      </p>
      <div className="home-buttons">
        <Link to="/create-event" className="home-button create-button">
          Create Event
        </Link>
        <Link to="/events" className="home-button view-button">
          View Events
        </Link>
      </div>
    </div>
  );
};

export default Home;
