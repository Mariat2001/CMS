import React from 'react';

function Validation(values) {
  let errors = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\s]+$/;
  const name_pattern = /^[A-Za-z]+\s[A-Za-z]+$/;
  const phone_pattern = /^\d+$/;
  const gender_pattern = /^(male|female)$/i;

  if (!values.name) {
    errors.name = 'name should not be empty';
  } else if (!name_pattern.test(values.name)) {
    errors.name = 'Invalid name format';
  }
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
  if (!values.phone) {
    errors.phone = 'Phone should not be empty';
  } else if (!phone_pattern.test(values.phone)) {
    errors.phone = 'Invalid phone format';
  }
 if (!values.gender) {
    errors.gender = 'Gender should not be empty';
  } else if (!gender_pattern.test(values.gender)) {
    errors.gender = 'Invalid gender format';
  }
  return errors;
}

export default Validation;
