/* -- libs -- */
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthRoute = ({ component: AuthComponent, ...rest }) => {
  const { isAuthenticated } = useSelector(state => state.user);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Redirect to="/" /> : <AuthComponent {...props} />
      }
    />
  );
};

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default AuthRoute;
