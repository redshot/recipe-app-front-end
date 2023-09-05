import React from 'react';
import Layout from './core/Layout';
import './App.css';

const App = () => {
  return (
    <Layout>
      <div className="col-md-6 offset-md-3 text-center">
        <h1 className="p-5">Recipe App</h1>
        <h2>Recipe App with ReactJS</h2>
        <hr />
        <div className="lead">
          <p>You will be able to add, view and manage recipes in this app. A login functionality was also developed so the user can login as an admin or as a user.</p>
          <p>This project was built using MERN Stack. The MERN stack is a popular set of tools and libraries used to build dynamic web applications. It includes the following tools:</p>
          <ul className="tools-list">
            <li className="item">MongoDB</li>
            <li className="item">Express</li>
            <li className="item">React</li>
            <li className="item">Node.js</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default App;

/**
 * - We used <Layout></Layout> component instead of a div
 */