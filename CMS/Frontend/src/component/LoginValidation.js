import React from 'react';

function Validation(values) {
  let errors = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\s]+$/;

  if (!values.email) {
    errors.email = 'Email should not be empty';
  } else if (!email_pattern.test(values.email)) {
    errors.email = 'Invalid email format';
  }

  if (!values.password) {
    errors.password = 'Password should not be empty';
  } else if (!password_pattern.test(values.password)) {
    errors.password = 'Invalid password format';
  }

  return errors;
}

export default Validation;
