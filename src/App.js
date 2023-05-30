import React from 'react';
import Layout from './core/Layout';

const App = () => {
  return (
    <Layout>
      <div className="col-md-6 offset-md-3 text-center">
        <h1 className="p-5">React Node MongoDB Authentication Boilerplate</h1>
        <h2>MERN STACK</h2>
        <hr />
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
        </p>
      </div>
    </Layout>
  );
};

export default App;

/**
 * - We used <Layout></Layout> component instead of a div
 */