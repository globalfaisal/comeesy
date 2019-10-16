/* -- mui -- */
import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  /* Header content */
  card: {
    minHeight: 200,
  },
  ul: {
    padding: 0,
  },
  li: {
    paddingLeft: 0,
  },
  liIcon: {
    marginRight: 10,
    fontSize: 18,
    color: theme.palette.colors.steelblue,
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));
