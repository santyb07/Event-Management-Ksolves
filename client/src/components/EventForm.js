import React, { useState } from 'react';
import axios from 'axios';
import { json, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './EventForm.css'; // Import the CSS file for styling

const EventForm = () => {
  const [event, setEvent] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    location:'',
    reminder_sent: false,
  });
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const navigate = useNavigate();
  console.log(currentUser?.id)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleLogin=()=>{
    toast.error("Please Login to Create the Event")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const eventData = {
      name: event.name,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      creator: currentUser?.id ,
      reminder_sent: event.reminder_sent,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/events', eventData);
      console.log(response.data)
      toast.success("Event Added...",{
        position:"top-center"
      })
      // alert('Event added successfully!',response);

      navigate(`/event/${response.data._id}`);
      // Reset form after submission
      setEvent({
        name: '',
        description: '',
        date: '',
        time: '',
        location:'',
        reminder_sent: false,
      });


    } catch (error) {
      console.error('Error adding event:', error);
      alert('Error adding event');
    }
  };

  return (
    <div className="event-form-container">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit} className="event-form">
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
          value={event.date}
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
        <input
          type="text"
          name="location"
          placeholder='Event Location'
          value={event.location}
          onChange={handleChange}
          required
          className="form-input"
        />
        {
          currentUser ?
          <button type="submit" className="submit-button">Add Event</button>:
          <button onClick={handleLogin} className="submit-button">Add Event</button>


        }
      </form>
    </div>
  );
};

export default EventForm;
