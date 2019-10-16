/* -- mui -- */
import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  main: {
    marginTop: theme.spacing(6) + 2, // --> 50px
  },
  paper: {
    flexGrow: 1,
    backgroundColor: theme.palette.colors.white,
    marginBottom: 30,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 30,
    },
  },
}));
