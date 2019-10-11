/* -- libs -- */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* -- styles -- */
import './Logo.css';

const logoWhitePath = '../assets/images/logo-white.svg';
const logoBlackPath = '../assets/images/logo-black.svg';

const Logo = ({ variant = 'white' }) => (
  <Link to="/">
    <img
      src={variant === 'white' ? logoWhitePath : logoBlackPath}
      alt="logo"
      className="app-logo"
    />
  </Link>
);
Logo.propTypes = {
  variant: PropTypes.string.isRequired,
};
export default Logo;
