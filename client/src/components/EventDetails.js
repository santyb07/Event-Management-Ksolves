import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './EventDetails.css'; // Import the CSS file for styling
import { toast } from 'react-toastify';

const EventDetails = () => {
  const { id } = useParams(); // Get the event ID from the URL parameters
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userResponse, setUserResponse] = useState(''); // State to track user response
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const handleLogin=()=>{
    toast.error("Please Login to attend the event")
  }
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data);
      } catch (err) {
        setError('Error fetching event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleRSVP = async (response) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      toast.error('Please log in to RSVP for this event.')
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/events/${id}/rsvp`, {
        userId: currentUser.id, // Assuming the user ID is stored in local storage
        response,
      });
      setUserResponse(response); // Update the local state with the user's response
      alert('Your RSVP has been recorded!');
    } catch (error) {
      console.error('Error RSVPing:', error);
      toast.error('There was an error recording your RSVP.')
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!event) {
    return <div>No event found.</div>;
  }

  return (
    <div className="event-details-container">
      <h1 className="event-title">{event.name}</h1>
      <p className="event-description">{event.description}</p>
      <p className="event-date">Date: {new Date(event.date).toLocaleDateString()}</p>
      <p className="event-time">Time: {event.time}</p>
      <p className="event-location">Location: {event.location}</p>

      <h2>RSVP</h2>
      <div className="rsvp-buttons">
        {
          currentUser ?
          <>
          <button onClick={() => handleRSVP('attending')} className="rsvp-button attending">Attending</button>
        <button onClick={() => handleRSVP('not attending')} className="rsvp-button not-attending">Not Attending</button>
        <button onClick={() => handleRSVP('maybe')} className="rsvp-button maybe">Maybe</button>
          </>:
          <>
          <button onClick={handleLogin} className="rsvp-button attending">Attending</button>
        <button onClick={handleLogin} className="rsvp-button not-attending">Not Attending</button>
        <button onClick={handleLogin} className="rsvp-button maybe">Maybe</button>
        </>
        }
        
      </div>

      <h2>Attendees</h2>
      <h3>Total : {event.attendees.length}</h3>
      {/* <ul>
        {event.attendees?.map((val,id)=>(
          <li>{val.userId}</li>
        ))}
      </ul> */}
      <ul className="attendee-list">
        {event.attendees.length > 0 ? (
          event.attendees.map((attendee, index) => (
            <li key={index} className="attendee-item">{attendee.userId} - {attendee.response}</li>
          ))
        ) : (
          <li>No attendees yet.</li>
        )}
      </ul>

      <Link to="/events" className="back-button">Back to Events</Link>
    </div>
  );
};

export default EventDetails;
