/* -- libs -- */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/* -- mui -- */
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

const StyledBudge = withStyles(theme => ({
  badge: {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: `0 0 0 2px ${theme.palette.colors.black}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: `1px solid ${theme.palette.secondary.light}`,
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const RippleBadge = ({ children }) => (
  <StyledBudge
    overlap="circle"
    variant="dot"
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
  >
    {children}
  </StyledBudge>
);

RippleBadge.propTypes = {
  children: PropTypes.any,
};
export default RippleBadge;
