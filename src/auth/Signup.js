import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Signup = () => {
  const [values, setValues] = useState({
    name: 'John Doe',
    email: 'johndoe1234@gmail.com',
    password: 'rrrrrr',
    buttonText: 'Submit'
  }); // values is an object while setValues is a function

  const {name, email, password, buttonText} = values; // destructure

  const handleChange = (name) => (event) => {

  }; // a function returning a function

  const clickSubmit = event => {

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
        <button className="btn btn-primary" onClick="{clickSubmit}">{buttonText}</button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
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
 * - Axios is a promised-based HTTP client for JavaScript.
 *  - It has the ability to make HTTP requests from the browser and handle the transformation of request and response data.
 * - The ToastContainer is just a simple component, which you can write text or even custom JSX elements in to customize the toast
 *   even more.
 * 
 * - The name, email and password will be stored in a state. 
 *  - When the "Submit" button is clicked, the informatiom from the state(name, email, paassword) to the backend API
 * 
 * - Take note we are using parenthesis () for signupForm() arrow function. 
 *  - If we use curly braces {}, we will need to use return keyword
 *  - If we use parenthesis (), we can use single wrapper element with child elements inside it without using return keyword
 * - onChange is an event handler in React. It detects when the value of an input element changes.
 *  - handleChange() function is called when there is an update in the input field.
 *  - The update in the field will be used to update the value in the state.
 * - The state will be updated using the handleState() function When a user types in the input field
 *  - The value is shown in value={name} or value={name} which is based on the state.
 * - We destructured the properties/values from the state so we don't have to type values.buttonText or values.name
 *  - We can output the values directly by typing { buttonText }
 * 
 */