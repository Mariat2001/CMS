import React, { useState,useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Validation from './RegisterValidation'
import axios from 'axios';

const Register = () => {
  const [shouldDisableAutofill, setShouldDisableAutofill] = useState(false);


  const [values, setValues] = useState({
    name:'',
    email: '',
    password: '',
    phone: '',
    gender: '',
  });
  const navigate = useNavigate();

  const [emailExists, setEmailExists] = useState(false); // State to track if the email exists

  const handleonSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));

    // Check if there are no validation errors
    if (!errors.name && !errors.email) {
      // Send a request to check if the email exists
      axios
        .post('http://localhost:8082/check-email', { email: values.email })
        .then((res) => {
          if (res.data.exists) {
            // Email already exists
            setEmailExists(true);
          } else {
            // Email does not exist, proceed with registration
            axios
              .post('http://localhost:8082/signup', values)
              .then((res) => {
                // Handle successful sign-up (insertion into the database)
                console.log('Sign-up successful', res.data);

                // Redirect to the sign-in page
                navigate('/'); // Adjust the route as needed
              })
              .catch((err) => {
                // Handle errors from the server (e.g., display an error message)
                console.error('Sign-up error', err);
              });
          }
        })
        .catch((err) => {
          // Handle errors from the server (e.g., display an error message)
          console.error('Email check error', err);
        });
    }
  };

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    console.log(event)
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value, // Corrected to set the value directly
    }));
    setEmailExists(false);
  };

  return (
    <div className="center">
    <input type="checkbox" id="show" />
    <label htmlFor="show" className="show-btn">Welcome</label>
    <div className="container">
      <label htmlFor="show" className="close-btn"></label>
      <div className="text">Login Form</div>
      <form action="#" onSubmit={handleonSubmit} autoComplete="off">
      <div className="data">
          <label>Name</label>
          <input
            type="name"
            name="name"
            value={values.name}
            onChange={handleInput} 
          required
     placeholder='Enter your name'
          />
        </div>
        <div className="data">
       
          <label>Email  {emailExists && (<p style={{ color: 'red', fontSize:'12px'}}>The email already exists.</p>
        )}</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleInput} 
            required placeholder='Enter your email'
          />
         
        </div>
        <div className="data">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleInput} 
          required
     placeholder='Enter your password'

          />
        </div>
        <div className="data">
          <label>Phone Number</label>
          <input
            type="phone"
            name="phone"
            value={values.phone}
            onChange={handleInput} 
          required
     placeholder='Enter your phone'
          />
        </div>

        <div className="data">
  <label>Gender</label>
  <input
    type="text" // Use text input type
    name="gender"
    value={values.gender}
    onChange={handleInput}
    required
    placeholder="Enter your gender (male or female)"
  />
</div>
        <div className='radio-btn-container' style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
      
</div>
        
        
        <div className="btn">
          <div className="inner"></div>
          <button type="submit" >SignUP</button>
        </div>
        <div className="signup-link">
        Already have an account? <Link to="/">SignIn now</Link>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Register

