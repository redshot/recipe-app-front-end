import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Signup = () => {
  return (
    <Layout>
      <ToastContainer />
      <h1>Signup</h1>
    </Layout>
  );
};

export default Signup;

/**
 * - useState is React Hook that allows you to add state to a functional component
 * - Axios is a promised-based HTTP client for JavaScript.
 *  - It has the ability to make HTTP requests from the browser and handle the transformation of request and response data.
 * - The ToastContainer is just a simple component, which you can write text or even custom JSX elements in to customize the toast
 *   even more.
 * 
 */