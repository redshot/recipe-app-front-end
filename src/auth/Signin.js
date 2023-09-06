import React, { useState } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { authenticate, isAuth } from './Helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    buttonText: 'Submit'
  }); // values is an object while setValues is a function

  const { email, password, buttonText} = values; // destructure

  const handleChange = (name) => (event) => { // the name is the name of the field(name, email, password)
    console.log(event.target.value);
    console.log('name: ', name);
    setValues({...values, [name]: event.target.value}); // change the values
  }; // a function returning a function

  const navigate = useNavigate();

  const clickSubmit = event => {
    event.preventDefault(); // prevents page reload
    setValues({...values, buttonText: 'Submitting'});
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/signin`, // this endpoint is in our api/backend(mern-auth-server)
      data: {email, password}
    })
    .then(response => {
      console.log('SIGNIN SUCCESS', response);
      // save the response(user info, token) in the localStorage/cookie
      authenticate(response, () => {
        setValues({...values, name: '', email: '', password: '', buttonText: 'Submitted'}); // change the values
        // toast.success(`Hey ${response.data.findUser.name}, Welcome back!`);
        isAuth() && isAuth().role === 'admin' ? navigate('/admin') : navigate('/private'); // redirect after signing in based on role
      });
    })
    .catch(error => {
      console.log('SIGNIN ERROR', error.response.data);
      setValues({...values, buttonText: 'Submit'}); // change the values
      toast.error(error.response.data.error);
    });
  };

  const signinForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
      </div>

      <div>
        <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
      </div>
    </form>
  );

  return (
    <Layout>
    { /*JSON.stringify(isAuth()) */ }
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {isAuth() ? <Navigate to="/" /> : null}
        {/* {JSON.stringify({name, email, password})}*/} {/* We can use this to know the value in the state */}
        <h1 className="p-5 text-center">Signin</h1>
        {signinForm()}
        <br/ >
        <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">Forgot Password</Link>
      </div>
    </Layout>
  );
};

export default Signin;

/**
 * - The codes in this file is based on Signup.js
 * - We just need to process email and password for the signin form/page
 * - This page will make a POST request to http://localhost:8000/api//signin
 *  - The user response which contains the user info and the token will be saved in the localStorage and cookie
 *    - The user info will be saved in the localStorage
 *    - The token will be saved in a cookie. A cookie is bit more secure when it comes to saving the token
 * - {isAuth() ? <Navigate to="/" /> : null} is an if else condition using ternary operand
 *  - It means if isAuth() is true redirect to home page and if not true just set to null
 */