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
    padding: theme.spacing(4),
    borderRadius: 3,
    minWidth: 320,
    maxWidth: '80%',
    position: 'relative',
    '&:focus': {
      outline: 'none',
    },
  },
  closeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
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
      // disableBackdropClick
      // disableEscapeKeyDown
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
