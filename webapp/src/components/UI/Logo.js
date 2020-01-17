/* -- libs -- */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';

/* -- images -- */
import logoWhitePath from '../../assets/images/logo-white.svg';
import logoBlackPath from '../../assets/images/logo-black.svg';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  logo: {
    width: 28,
    height: 28,
  },
}));

const Logo = ({ variant = 'white', title, className }) => {
  const classes = useStyles();
  return (
    <img
      src={variant === 'white' ? logoWhitePath : logoBlackPath}
      alt="logo"
      className={clsx(classes.logo, className)}
      title={title}
    />
  );
};
Logo.propTypes = {
  variant: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
};
export default Logo;
