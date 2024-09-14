import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navigate = useNavigate();

    const handleLogout=()=>{
        localStorage.removeItem('currentUser');
        navigate('/');
    }
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Home</Link>
        <div className="navbar-links">
          <Link to="/create-event" className="navbar-link">Create Event</Link>
          <Link to="/events" className="navbar-link">View Events</Link>
          {
            currentUser ? 
            `${currentUser.email}`:
            <Link to="/login" className="navbar-link">Login</Link>
          }
          {
            currentUser &&
            <a style={{cursor:'pointer'}} onClick={handleLogout}>Logout</a>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
