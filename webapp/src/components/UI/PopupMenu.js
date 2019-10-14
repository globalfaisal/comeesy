/* -- libs -- */
import React from 'react';
import PropTypes from 'prop-types';

/* -- mui -- */
import { withStyles } from '@material-ui/core/styles';
import { Menu as MuiMenu } from '@material-ui/core';

/* -- styles -- */
const Menu = withStyles({
  paper: {
    minWidth: 120,
    marginTop: -1,
    borderRadius: 0,
  },
})(MuiMenu);

const PopupMenu = ({ children, ...props }) => (
  <Menu
    getContentAnchorEl={null}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    {...props}
  >
    {children}
  </Menu>
);

PopupMenu.propTypes = {
  children: PropTypes.node.isRequired,
};
export default PopupMenu;
