import React, { useState, useEffect } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
//import jwt_decode from 'jwt-decode';
import * as jose from 'jose'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Activate = ({match}) => {
  const [values, setValues] = useState({
    name: '',
    token: '',
    show: true
  }); // values is an object while setValues is a function

  let paramsToken = useParams(); // useParams replaced match.params.id on react-router-dom 6

  useEffect(() => { // runs when there is an update in the state
    /*
    // let token = match.params.token; // obsolete
    let token = paramsToken; // token contains the name, token
    // we don't need to tyope token.name if we destructure it
    let { name } = jwt_decode(JSON.stringify(token)); // can be read as let destructure name from, jwt_decode() requires the token to be converted into string first
    console.log(name);

    if (token) {
      setValues({...values, name, token});
    }
    */

    let token = paramsToken; // token contains the name, token
    /*
    let decoded_token = JSON.parse(new TextDecoder().decode(jose.base64url.decode(token.split(".")[1])));
    let name = decoded_token.name;               // ...and with this
    */
    // console.log(decoded_token);

    //let myDecode = JSON.parse(new TextDecoder().decode(token));
    let myDecode = atob(JSON.stringify(token).split('.')[1]);
    console.log(JSON.stringify(token).split('.')[1]);
    console.log(myDecode);
    /*
    if (token) {
        setValues({ ...values, name, token });
    }
    */
  }, []);

  const { name, token, show } = values; // destructure

  const clickSubmit = event => {
    event.preventDefault(); // prevents page reload
    //let convertToken =  JSON.parse(new TextDecoder().decode(jose.base64url.decode(JSON.stringify(token).split('.')[1])));
    let newToken = paramsToken;
    

    /*
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/account-activation`, // this endpoint is in our api/backend(mern-auth-server)
      data: { newToken }
    })
    .then(response => {
      console.log('ACCOUNT ACTIVATION', response);
      setValues({...values, show: false}); // change the values
      toast.success(response.data.message);
    })
    .catch(error => {
      console.log('ACCOUNT ACTIVATION ERROR', error);
      //toast.error(error.response.data.error);
    });
    */

    /*
    let activateAccount = async () => {
      console.log(newToken);

      let sendRequest = await fetch(`${process.env.REACT_APP_API}/account-activation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newToken),
      });
    }
    
    activateAccount();
    */
  };

  const activationLink = () => (
    <div className="text-center">
      <h1 className="p-5">Hey {name}, Ready to activate your account?</h1>
      <button className="btn btn-outline-primary" onClick={clickSubmit}>Activate Account</button>
    </div>
  ); // used parenthesis so we don't use the return keyword

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
 * - The codes in this file is based Signup.js
 * 
 */