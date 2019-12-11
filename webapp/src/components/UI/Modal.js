/* -- libs -- */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

/* -- actions -- */
import { closeModal } from '../../actions/UIActions';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import { Modal as MuiModal } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.colors.white,
    boxShadow: theme.shadows[5],
    padding: '42px 32px',
    borderRadius: 3,
    minWidth: 320,
    maxWidth: '80%',
    [theme.breakpoints.down(420)]: {
      minWidth: '100%',
      maxWidth: '100%',
      minHeight: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    position: 'relative',
    '&:focus': {
      outline: 'none',
    },
  },
  closeButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    color: theme.palette.colors.grey,
  },
}));

const Modal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isOpen, content: Component } = useSelector(state => state.UI.modal);

  const onClose = () => {
    dispatch(closeModal());
  };

  return (
    <MuiModal
      aria-labelledby="modal-title"
      className={classes.modal}
      open={isOpen}
      onClose={onClose}
      disableAutoFocus
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div className={classes.paper}>
          <IconButton
            key="close"
            aria-label="close"
            size="small"
            onClick={onClose}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
          <div className="modelContent">{Component && <Component />}</div>
        </div>
      </Fade>
    </MuiModal>
  );
};
export default Modal;
