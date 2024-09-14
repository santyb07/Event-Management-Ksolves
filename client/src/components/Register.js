import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import './Register.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/api/register', user);
      setSuccess('Registration successful! You can now log in.');
      setUser({ name: '', email: '', password: '' }); // Reset 
      toast.success("Registration / Login Successfull.. ")
      navigate(`/login`);
    } catch (error) {
      toast.error(error.response.data.message)


      console.log('Error registering user:', error.response.data.message);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="form-input"
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="form-input"
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="form-input"
        />
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default Register;
