import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Activate from './auth/Activate';
import Private from './core/Private';
import Admin from './core/Admin';
import Recipes from './core/Recipes';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import RecipesRoute from './auth/RecipesRoute';
import Forgot from './auth/Forgot';
import Reset from './auth/Reset';

const StartingRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/signin" exact element={<Signin />} />
        <Route path="/auth/activate/:token" exact element={<Activate />} />
        <Route path="/private" element={<PrivateRoute Component={Private} />} />
        <Route path="/admin" element={<AdminRoute Component={Admin} />} />
        <Route path="/recipes" element={<RecipesRoute Component={Recipes} />} />
        <Route path="/auth/password/forgot" exact element={<Forgot />} />
        <Route path="/auth/password/reset/:token" exact element={<Reset />} />
      </Routes>
    </BrowserRouter>
  );
};

export default StartingRoutes;

/**
 * - In react-router-dom v6, "<Switch></Switch>" component is replaced by routes "<Routes></Routes>" component
 * - StartingRoutes is a component
 * - By using React Router's exact prop on the first route, you can ensure that the route will match only 
 *   if the current URL is an exact match.
 * 
 * 
 */