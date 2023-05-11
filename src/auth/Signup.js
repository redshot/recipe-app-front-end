import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { isAuth } from './Helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Signup = () => {
  const [values, setValues] = useState({
    name: 'John Doe',
    email: 'johndoe_testemail_only123@gmail.com',
    password: 'rrrrrr',
    buttonText: 'Submit'
  }); // values is an object while setValues is a function

  const {name, email, password, buttonText} = values; // destructure

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

  const signupForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={handleChange('name')} value={name} type="text" className="form-control" />
      </div>

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
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {isAuth() ? <Navigate to="/" /> : null}
        {/* {JSON.stringify({name, email, password})}*/} {/* We can use this to know the value in the state */}
        <h1 className="p-5 text-center">Signup</h1>
        {signupForm()}
      </div>
    </Layout>
  );
};

export default Signup;

/**
 * - useState is a React Hook that allows you to add state to a functional component
 *  - The state is a built-in React object that is used to contain data or information about the component
 * 
 * - Axios is a promised-based HTTP client for JavaScript.
 *  - It has the ability to make HTTP requests from the browser and handle the transformation of request and response data.
 * 
 * - The ToastContainer is just a simple component, which you can write text or even custom JSX elements in to customize the toast
 *   even more. 
 *   - We use it to display notifications
 * 
 * - Take note we are using parenthesis () for signupForm() arrow function. 
 *  - If we use curly braces {}, we will need to use return keyword
 *  - If we use parenthesis (), we can use single wrapper element with child elements inside it without using return keyword
 * 
  * - We destructured the properties/values from the state so we don't have to type values.buttonText or values.name
 *  - We can output the values directly by typing { buttonText }
 * 
 * - The state will be updated using the handleChange() function When a user types in the input field
 *  - The value is shown in value={name} or value={name} which is based on the state.
 *  - handleChange() function is called when there is an update in the input field.
 *    - The value will be saved in the state based on the name.
 *    - The name is the name of the field(name, email, password) 
 *  - onChange is an event handler in React. It detects when the value of an input element changes.
 * 
 * - The 3 dots/... is a spread arrow operator. It's feature from ES6.
 *  - The spread syntax allows an expression to be expanded in places where multiple arguments or multiple elements are expected.
 * 
 * - The clickSubmit() function will send the informatiom from the state(name, email, paassword) the backend API
 * 
 */