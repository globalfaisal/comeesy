/* -- libs -- */
import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

/* -- component -- */
import CreatePostForm from '../CreatePostForm/CreatePostForm';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  navLink: {
    margin: '0 4px',
    fontSize: 32,
    color: theme.palette.colors.greylight,
  },
}));

const CreatePostNavLink = () => {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <IconButton
        component={Link}
        to="#"
        onClick={onOpen}
        id="userMenuButton"
        aria-controls="userMenu"
        aria-haspopup="true"
        color="inherit"
        className={classes.navLink}
      >
        <AddIcon fontSize="inherit" />
      </IconButton>
      {isOpen && <CreatePostForm isOpen={isOpen} onClose={onClose} />}
    </Fragment>
  );
};

export default CreatePostNavLink;
