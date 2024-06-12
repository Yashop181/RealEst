// src/components/Auth/Register.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/actions/authActions';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
    alert("Registration Successful")
    setName('')
    setEmail('')
    setPassword('')
  };

  return (
    <form onSubmit={onSubmit} className="register-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete='username' />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='useremail' />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='userpassword'  />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
