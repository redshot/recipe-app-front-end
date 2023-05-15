import React, { Component } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuth } from './Helpers';

/*
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
        render={props =>
          isAuth() ? (
            <Component {...props} />
          ) : (
              <Navigate 
                to={{
                  pathname: '/signin',
                  state: { from: props.location }
              }} />
            )
        }
    ></Route>
);
*/
const PrivateRoute = ({Component}) => {
  const auth = isAuth();

  return auth ? <Component /> : <Navigate to="/signin" />; // redirect user to signin pagge if they are not authenticated
}

export default PrivateRoute;

/**
 * - The code in this file is based on 
 *   https://stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou
 * - We followed the code on stackoverflow because we are using react router dom versin 6 for this
 * - The code is much more simpler for react router dom version 6
 */