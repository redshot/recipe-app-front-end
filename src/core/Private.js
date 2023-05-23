import React, { useState } from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Private = () => {
  const [values, setValues] = useState({
    role: '',
    name: 'John Doe',
    email: 'johndoe_testemail_only123@gmail.com',
    password: 'rrrrrr',
    buttonText: 'Submit'
  }); // values is an object while setValues is a function

  const {role, name, email, password, buttonText} = values; // destructure

  const handleChange = (name) => (event) => { // the name is the name of the field(name, email, password)
    console.log(event.target.value);
    console.log('name: ', name);
    setValues({...values, [name]: event.target.value}); // change the values
  }; // a function returning a function

  const clickSubmit = event => {
    event.preventDefault(); // prevents page reload
    setValues({...values, buttonText: 'Submitting'});
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/signup`, // this endpoint is in our api/backend(mern-auth-server)
      data: {name, email, password}
    })
    .then(response => {
      console.log('SIGNUP SUCCESS', response);
      setValues({...values, name: '', email: '', password: '', buttonText: 'Submitted'}); // change the values
      toast.success(response.data.message);
    })
    .catch(error => {
      console.log('SIGNUP ERROR', error.response.data);
      setValues({...values, buttonText: 'Submit'}); // change the values
      toast.error(error.response.data.error);
    });
  };

  const updateForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Role</label>
        <input defaultValue={role} type="text" className="form-control" />
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={handleChange('name')} value={name} type="text" className="form-control" />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input defaultValue={email} type="email" className="form-control" />
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
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <h1 className="pt-5 text-center">Private</h1>
        <p className="lead text-center">Profile update</p>
        {updateForm()}
      </div>
    </Layout>
  );
};

export default Private;

/**
 * - The codes in this file is based on Signup.js
 * - We can use defaultValue or readOnly for <input value={role} type="text" className="form-control" /> and
 *   <input value={email} type="email" className="form-control" />
 */