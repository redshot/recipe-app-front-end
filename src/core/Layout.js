import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const nav = () => (
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link href="/" className="text-light nav-link">Home</Link>
      </li>
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
 * 
 */