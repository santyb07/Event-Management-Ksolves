import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'; // Your Home component
import EventForm from './components/EventForm'; // Your Event Form component
import EventList from './components/EventList'; // Your Event List component
import UpdateEvent from './components/UpdateEvent'; // Your Update Event component
import EventDetails from './components/EventDetails';
import Navbar from './components/Navbar'; // Adjust the path as necessary
import Register from './components/Register';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
       <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-event" element={<EventForm />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/update-event/:id" element={<UpdateEvent />} />
      </Routes>
    </Router>
  );
};

export default App;
