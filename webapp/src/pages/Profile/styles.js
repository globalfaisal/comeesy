/* -- mui -- */
import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  paper: {
    flexGrow: 1,
    backgroundColor: theme.palette.colors.white,
    marginBottom: 30,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 30,
    },
  },

  tab: {
    minWidth: 100,
    maxWidth: 100,
  },
}));
