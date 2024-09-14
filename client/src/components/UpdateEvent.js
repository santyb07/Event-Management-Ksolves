import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import './UpdateEvent.css'; // Import the CSS file for styling

const UpdateEvent = () => {
  const [event, setEvent] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    attendees: [], // Initialize as an array
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the name is 'attendees', split the input value into an array
    if (name === 'attendees') {
      setEvent({ ...event, [name]: value.split(',').map(attendee => attendee.trim()) });
    } else {
      setEvent({ ...event, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/events/${id}`, event);
      console.log('Update response:', response.data);
      toast.success("Event Updated...",{
        position:"top-center"
      })
      navigate('/events');
    } catch (error) {
      console.error('Error updating event:', error);
      console.error('Error response:', error.response.data);
    }
  };
  
  const handleRemoveAttendee = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}/rsvp`, {
        data: { userId }, // Send the userId in the request body
      });
      setEvent((prevEvent) => ({
        ...prevEvent,
        attendees: prevEvent.attendees.filter(attendee => attendee.userId !== userId),
      }));
      toast.success('Attendee removed successfully!');
    } catch (error) {
      console.error('Error removing attendee:', error);
      alert('There was an error removing the attendee.');
    }
  };

  return (
    <div className="update-event-container">
      <h2>Update Event</h2>
      <form onSubmit={handleSubmit} className="update-event-form">
        <input
          name="name"
          value={event.name}
          onChange={handleChange}
          placeholder="Event Name"
          required
          className="form-input"
        />
        <textarea
          name="description"
          value={event.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="form-textarea"
        />
        <input
          type="date"
          name="date"
          value={event.date.split('T')[0]} // Format date for input
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="time"
          name="time"
          value={event.time}
          onChange={handleChange}
          required
          className="form-input"
        />
        <h2>Attendees</h2>
        <h3>Total : {event.attendees.length}</h3>

        <ul className="attendee-list">
        {event.attendees.length > 0 ? (
          event.attendees.map((attendee, index) => (
            <div key={index} style={{display:'flex'}}>
            <li key={index} className="attendee-item">{attendee.userId} - {attendee.response}</li>
            <button onClick={() => handleRemoveAttendee(attendee.userId)} className="remove-attendee-button">Remove</button>
            </div>
          ))

        ) : (
          <li>No attendees yet.</li>
        )}
       </ul>

        <button type="submit" className="submit-button">Update Event</button>
      </form>
    </div>
  );
};

export default UpdateEvent;
