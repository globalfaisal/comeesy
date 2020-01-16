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
    borderRadius: 0,
  },
})(MuiMenu);

const PopupMenu = ({ id, anchorEl, open, onClose, children, ...rest }) => (
  <MuiMenu
    id={id}
    anchorEl={anchorEl}
    open={open}
    onClose={onClose}
    {...rest}
    getContentAnchorEl={null}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    variant="menu"
    role="menu"
  >
    {children}
  </MuiMenu>
);

PopupMenu.propTypes = {
  id: PropTypes.string.isRequired,
  anchorEl: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};
export default PopupMenu;
