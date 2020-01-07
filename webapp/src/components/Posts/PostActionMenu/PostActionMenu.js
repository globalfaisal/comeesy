/* -- libs -- */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

/* -- actions -- */

/* -- mui -- */
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import Editcon from '@material-ui/icons/EditRounded';
import DeleteIcon from '@material-ui/icons/DeleteForeverRounded';

/* -- styles -- */
import useStyles from './styles';

const PostActionMenu = ({ post }) => {
  const classes = useStyles();

  const currentUser = useSelector(state =>
    state.user.data ? state.user.data.credentials : null
  );

  if (!post || !currentUser) return null;
  return post.user.username === currentUser.username ? (
    <PopupState variant="popover" popupId="cardActionMenu">
      {popupState => (
        <Fragment>
          <IconButton {...bindTrigger(popupState)} size="small">
            <MoreVertIcon />
          </IconButton>
          <Menu
            {...bindMenu(popupState)}
            getContentAnchorEl={null}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem
              className={classes.menuItem}
              onClick={() => {
                // TODO: CALL EDIT POST FUNC.
                popupState.close();
              }}
            >
              <Editcon fontSize="small" />
              <Typography variant="body2">Edit</Typography>
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={() => {
                // TODO: DISPATCH DELETE ACTION.
                popupState.close();
              }}
            >
              <DeleteIcon fontSize="small" />
              <Typography variant="body2">Delete</Typography>
            </MenuItem>
          </Menu>
        </Fragment>
      )}
    </PopupState>
  ) : null;
};
PostActionMenu.propTypes = {
  post: PropTypes.object.isRequired,
};
export default PostActionMenu;
