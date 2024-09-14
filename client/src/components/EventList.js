import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './EventList.css'; // Import the CSS file for styling

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    };
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      setEvents(events.filter(event => event._id !== id));
      // alert('Event deleted successfully');
      toast.success("Event Deleted Successfully...",{
        position:"top-center"
      })
    } catch (error) {
      toast.error("Something went wrong...",{
        position:"top-center"
      })
      console.error('Error deleting event:', error);
      alert('Error deleting event');
    }
  };

  return (
    <div className="event-list-container">
      <h1 className="event-list-title">Event List</h1>
      <div className="event-list">
        {events.map(event => (
          <div className="event-card" key={event._id}>
            <h2 className="event-card-title">{event.name}</h2>
            <p className="event-card-description">{event.description}</p>
            <p className="event-card-date">Date: {new Date(event.date).toLocaleDateString()}</p>
            <p className="event-card-time">Time: {event.time}</p>
            <div className="event-card-actions">
              <Link to={`/event/${event._id}`} className="event-card-button">View Details</Link>
              <Link to={`/update-event/${event._id}`} className="event-card-button edit-button">Edit</Link>
              <button onClick={() => handleDelete(event._id)} className="event-card-button delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
