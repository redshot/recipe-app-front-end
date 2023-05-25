import React, { useState, useEffect } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Activate = ({match}) => {
  const [values, setValues] = useState({
    name: '',
    token: '',
    show: true
  }); // values is an object while setValues is a function

  let paramsToken = useParams(); // useParams() replaced match.params.token on react-router-dom 6

  useEffect(() => {
    // let token = match.params.token;
    let token = paramsToken;
    let { name } = jwt_decode(JSON.stringify(token));
    console.log(name);
    console.log(token);
  
    if (token) {
      setValues({ ...values, name, token }); // update the state
    }
  }, []);

  const { name, token, show } = values; // destructure

  const clickSubmit = event => { // save user in the database
    event.preventDefault(); // prevents page reload
    /*
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/account-activation`, // this endpoint is in our api/backend(mern-auth-server)
      data: { token }
    })
    .then(response => {
      console.log('ACCOUNT ACTIVATION', response);
      setValues({...values, show: false}); // change the values
      toast.success(response.data.message);
    })
    .catch(error => {
      console.log('ACCOUNT ACTIVATION ERROR', error);
      toast.error(error.response.data.error);
    });
    */
  
    let activateAccount = async () => {
     try {
      let newToken = paramsToken;
      let sendRequest = await fetch(`${process.env.REACT_APP_API}/account-activation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newToken),
      });
      let response = await sendRequest.json();
      console.log(response);

      if (sendRequest.status === 200) { // success
        console.log('ACCOUNT ACTIVATION', response.message);
        setValues({...values, show: false}); // change the values
        toast.success(response.message);
      }
 
      return response;
     } catch(error) { // sendRequest.status === 400 or 401 is currently not being catched
      console.log('ACCOUNT ACTIVATION ERROR', error);
      toast.error(error);

      return error;
     }
    }
    
    activateAccount();
  };

  const activationLink = () => (
    <div className="text-center">
      <h1 className="p-5">Hey {name}, Ready to activate your account?</h1>
      <button className="btn btn-outline-primary" onClick={clickSubmit}>Activate Account</button>
    </div>
  ); // used parenthesis so we don't have to use the return keyword

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {/* {JSON.stringify({name, email, password})}*/} {/* We can use this to know the value in the state */}
        {activationLink()}
      </div>
    </Layout>
  );
};

export default Activate;

/**
 * - The codes in this file is based on Signup.js
 * - Code flow:
 *  - When the component is loaded, we are grabbing the token from the routes/url. We are able to grab the token 
 *    using the {match} props. The JWT token is decoded so we can get the name and set it back to the useState({})
 *    - This is the code in the Routes.js file: <Route path="/auth/activate/:token" exact element={<Activate />} />
 *    - This is how we grab the token from the url: let token = paramsToken;
 *  - When the useEffect() hook runs, we will have the jwt token that was taken from the route parameter/url using the 
 *    {match} props. We decode the token to get the name. Finally, the name and token will be used to save it back in the state - useState({})
 *  - Send the token in the backend
 *    - We are doing a check in the backend to make sure the token is not expired
 *    - Create a new user based in the informnatin in the token
 *  - Save the user
 * 
 * - useEffect() will run every time there is a change in the state
 *  - Note: I think useEffect() will run even though there is no change in the state.
 *    - Hence, useEffect() will run when component mounts, unmounts or renders
 *  - We can pass certain agrguments to make sure the useEffect() runs only when the particular property changes.
 *  - useEffect() takes a function as the first parameter while the second parameter is an empty array
 *    - If the second parameter is empty, it means the useEffect() will run every time there is a change in the state
 *    - We can also pass name in the array: useEffect(() => {}, [name])
 *      - When the name in the state changes, only then the useEffec() will run.
 *  - let token = paramsToken contains the name, email and password. You can decode it to get the individual detail
 *  - we don't need to type token.name if we destructure it
 *  - let { name } = jwt_decode(JSON.stringify(token)); can be read as let destructure name from. 
 *    jwt_decode() requires the token to be converted into string first
 *  - We replaced jsonwebtoken package with jwt-decode package
 *  - We were able to display the name in Hey {name}, Ready to activate your account? because of the state
 *  - We used fetch instead of axios because axios is return a ERR_BAD_REQUEST
 */