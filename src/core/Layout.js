import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuth, signout  } from '../auth/Helpers';

const Layout = ({ children }) => {
  let currentPath = window.location.pathname;
  const isActive = path => {
    if (currentPath === path) {
      return { color: '#000'}
    } else {
      return { color: '#fff'}
    }
  }
  const redirectTo = useNavigate();

  const nav = () => (
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link to="/" className="nav-link" style={isActive('/')}>Home</Link>
      </li>

      {!isAuth() && (
        <Fragment>
          <li className="nav-item">
            <Link to="/signin" className="nav-link" style={isActive('/signin')}>Signin</Link>
          </li>

          <li className="nav-item">
            <Link to="/signup" className="nav-link" style={isActive('/signup')}>Signup</Link>
          </li>
        </Fragment>
      )}

      {isAuth() && isAuth().role === 'admin' && (
        <li className="nav-item">
          <Link className="nav-link" style={isActive('/admin')} to="/admin">{isAuth().name}</Link>
        </li>
      )}

      {isAuth() && isAuth().role === 'subscriber' && (
        <li className="nav-item">
          <Link className="nav-link" style={isActive('/private')} to="/private">{isAuth().name}</Link>
        </li>
      )}

      {isAuth() && (
        <li className="nav-item">
          <span 
            className="nav-link"
            style={{cursor: 'pointer', color: '#fff'}}
            onClick={() => {
            signout(() => {
              redirectTo('/')
            })
          }}>Signout</span>
        </li>
      )}
    </ul>
  );

  return (
    <Fragment>
      { nav() }
      <div className="container">{ children }</div>
    </Fragment>
  )
};

export default Layout; // we can import this layout component in any page/s since we export it

/**
 * - Fragment is a feature in React that allows you to return multiple elements from a React component by allowing you to 
 *   group a list of children without adding extra nodes to the DOM
 * - ({ children }) works like ({ props }) but we just destructure it we can call directly with { children } instead of { props.children }
 * - nav() is a function
 * - Link component comes with react-router-dom. It prevents page refresh when the link is clicked
 * - We "to" propert instead of "href" propery for the <Link></Link>
 * - This file handles the navigation
 * - If a user is not authenticated(!isAuth), Signin and Signup will display
 *  - <Fragment></Fragment> is a feature in React that allows you to return multiple elements from a React component 
 *    by allowing you to group a list of children without adding extra nodes to the DOM
 * 
 */