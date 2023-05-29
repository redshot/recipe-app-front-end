import React, { useState } from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Forgot = () => {
  const [values, setValues] = useState({
    email: '',
    buttonText: 'Request password reset link'
  }); // values is an object while setValues is a function

  const { email, buttonText} = values; // destructure

  const handleChange = (name) => (event) => { // the name is the name of the field(name, email, password)
    console.log(event.target.value);
    console.log('name: ', name);
    setValues({...values, [name]: event.target.value}); // change the values
  }; // a function returning a function

  const clickSubmit = event => {
    event.preventDefault(); // prevents page reload
    setValues({...values, buttonText: 'Submitting'});
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API}/forgot-password/`, // this endpoint is in our api/backend(mern-auth-server)
      data: {email}
    })
    .then(response => {
      console.log('FORGOT PASSWORD SUCCESS', response.data.message);
      toast.success(response.data.message);
      setValues({...values, buttonText: 'Requested'});
    })
    .catch(error => {
      console.log('FORGOT PASSWORD ERROR', error.response.data);
      toast.error(error.response.data.error);
      setValues({...values, buttonText: 'Request password reset link'}); // change the values
    });
  };

  const passwordForgotForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
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
        {/* {JSON.stringify({name, email, password})}*/} {/* We can use this to know the value in the state */}
        <h1 className="p-5 text-center">Forgot password</h1>
        {passwordForgotForm()}
      </div>
    </Layout>
  );
};

export default Forgot;

/**
 * - The codes in this file is based on Signin.js
 * - This page will make a PUT request to http://localhost:3000/auth/password/forgot
 * 
 */