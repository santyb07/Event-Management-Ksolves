import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { toast } from 'react-toastify';
import './Login.css'; // Import the CSS file for styling

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:5000/api/login', credentials);
      // Store user details in local storage
      localStorage.setItem('currentUser', JSON.stringify(response.data.user)); // Store user details
      setSuccess('Login successful!'); // Optionally redirect or perform other actions
      toast.success("Login Successfull.. ")
      navigate('/'); // Redirect to events page after successful login
      setCredentials({ email: '', password: '' }); // Reset form

    } catch (error) {
        toast.error(error.response.data.message)
        console.error('Error logging in user:', error);
      setError('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="form-input"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="form-input"
        />
        <button type="submit" className="submit-button">Login</button>
      </form>
      <div className="register-link">
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
};

export default Login;
