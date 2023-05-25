import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { isAuth, getCookie, signout } from '../auth/Helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Private = () => {
  const [values, setValues] = useState({
    role: '',
    name: '',
    email: '',
    password: '',
    buttonText: 'Submit'
  }); // values is an object while setValues is a function

  const token = getCookie('token');
  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => { // this function will get user information
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
      Authorization: `Bearer ${token}`
    }
    })
    .then(response => {
      console.log('PRIVATE PROFILE UPDATE', response);
      const { role, name, email } = response.data;
      setValues({ ...values, role, name, email });
    })
    .catch(error => {
      console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
      if (error.response.status === 401) { // signout and redirect if token is expired
        signout(() => {
          navigate('/');
        });
      }
    });
  };

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
        <input defaultValue={role} type="text" className="form-control" disabled />
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={handleChange('name')} value={name} type="text" className="form-control" />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input defaultValue={email} type="email" className="form-control" disabled />
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
 * - Code flow:
 *  - When the component is loaded, we are grabbing the user info in the database via loadProfile() function
 *  - We will populate the state using the response data of loadProfile() function via setValues();
 *  - Note:L The role and email fields are disabled and cannot be updated
 * 
 * - useEffect() will run every time there is a change in the state
 *  - We can pass certain agrguments to make sure the useEffect() runs only when the particular property changes.
 *  - useEffect() takes a function as the first parameter while the second parameter is an empty array
 *    - If the second parameter is empty, it means the useEffect() will run every time there is a change in the state
 *    - We can also pass name in the array: useEffect(() => {}, [name])
 *      - When the name in the state changes, only then the useEffec() will run.
 * 
 * - These three dots are called the spread syntax or spread operator. The spread syntax is a feature of ES6,
 *   and it’s also used in React.
 *  - Spread syntax allows you to deconstruct an array or object into separate variables
 *  - Source: https://sentry.io/answers/react-spread-operator-three-dots/
 */