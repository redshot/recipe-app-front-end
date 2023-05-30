import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Reset = () => { // props.match from react router dom
  const [values, setValues] = useState({
    name: '',
    token: '',
    newPassword: '',
    buttonText: 'Reset password'
  }); // values is an object while setValues is a function

  let paramsToken = useParams(); // useParams() replaced match.params.token on react-router-dom 6

  useEffect(() => {
    let token = paramsToken;
    let { name } = jwt_decode(JSON.stringify(token));

    if (token) {
      setValues({...values, name, token});
    }
  }, []); // The empty array [] is an optional dependency. It will run when the component mounds if it is empty

  const { name, token, newPassword, buttonText} = values; // destructure

  const handleChange = event => {
    setValues({...values, newPassword: event.target.value}); // change the values
  };

  const clickSubmit = event => {
    event.preventDefault(); // prevents page reload
    let token = paramsToken.token.split(' ')[0]; // this needs to be converted into JWT value only because http://localhost:3000/auth/password/reset/:token does not accept an object
    setValues({...values, buttonText: 'Submitting'});
    console.log(token);
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API}/reset-password`, // this endpoint is in our api/backend(mern-auth-server)
      data: {newPassword, resetPasswordLink: token}
    })
    .then(response => {
      console.log('RESET PASSWORD SUCCESS', response.data.message);
      toast.success(response.data.message);
      setValues({...values, buttonText: 'Done'});
    })
    .catch(error => {
      console.log('RESET PASSWORD ERROR', error.response.data);
      toast.error(error.response.data.error);
      setValues({...values, buttonText: 'Reset password'}); // change the values
    });
  };
  
  const passwordResetForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={handleChange} value={newPassword} type="password" className="form-control" placeholder="Type new password" required />
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
        <h1 className="p-5 text-center">Hey {name}, Type your new password</h1>
        {passwordResetForm()}
      </div>
    </Layout>
  );
};

export default Reset;

/**
 * - The codes in this file is based on Forgot.js
 * - This page will make a PUT request to http://localhost:3000/auth/password/forgot
 * - This component handles the reset password page
 * - Code flow:
 *  - Grab the token from the router/url When this component is loaded/mounted
 *  - When the component mounts, useEffect() will execute.
 *    - As a result, the name and token is available in the state through setValues({...values, name, token});
 *  - The user will have to input their new password in the form
 *  - The reset password button will make an API request to http://localhost:3000/auth/password/reset/:token - backend.
 *    - The request will finally save the new password
 * 
 * - useEffect() will run every time there is a change in the state
 *  - Note: I think useEffect() will run even though there is no change in the state.
 *    - Hence, useEffect() will run when component mounts, unmounts or renders
 *  - We can pass certain agrguments to make sure the useEffect() runs only when the particular property changes.
 *  - useEffect() takes a function as the first parameter while the second parameter is an empty array
 *    - If the second parameter is empty, it means the useEffect() will run every time there is a change in the state
 *    - We can also pass name in the array: useEffect(() => {}, [name])
 *      - When the name in the state changes, only then the useEffec() will run.
 */