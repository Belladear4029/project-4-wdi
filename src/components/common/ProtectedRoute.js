import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

const ProtectedRoute = ({ component: Component, ...props }) => {
  if(!Auth.isAuthenticated()) Flash.setMessage('danger', 'Please login to add your recommendation');
  return Auth.isAuthenticated() ? <Route {...props} component={Component}/> : <Redirect to="/login" />;
};

export default ProtectedRoute;
