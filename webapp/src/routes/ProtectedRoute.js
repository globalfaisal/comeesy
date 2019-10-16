/* -- libs -- */
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = props => {
  const { isAuthenticated } = useSelector(state => state.user);
  return isAuthenticated ? <Route {...props} /> : <Redirect to="/auth/login" />;
};

export default ProtectedRoute;
