import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'
import './Login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loginFailed, setLoginFailed] = useState(false);
  const handleInputChange = (e) => {
    console.log(e)
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault();
    // Send a POST request to your server's /login endpoint
    axios
      .post('http://localhost:8082/login', formData)
      .then((response) => {
        if (response.data === 'Success') {
          navigate('/HomeDashboards');
          // Authentication succeeded, you can redirect or perform actions here
          console.log('Login successful');
        } else {
          setLoginFailed(true);
          // Authentication failed, display an error message or handle as needed
          console.error('Login failed');

        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
  };

  return (
    <div className="center">
    <input type="checkbox" id="show" />
    <label htmlFor="show" className="show-btn">Welcome</label>
    <div className="container">
      <label htmlFor="show" className="close-btn"></label>
      <div className="text">Login Form</div>
      <form action="#" onSubmit={handleLogin}>
        <div className="data">
          <label>Email or Phone</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required placeholder='Enter your email'
          />
        </div>
        <div className="data">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          required
     placeholder='Enter your password'
          />
        </div>
        
        <div className="btn">
          <div className="inner"></div>
          <button type="submit" >Login</button>
        </div>
        <div className="signup-link">
        Don't have an account? <Link to="/signup">Signup now</Link>
        </div>
      </form>
    </div>
  </div>
  );
};

export default Login;
