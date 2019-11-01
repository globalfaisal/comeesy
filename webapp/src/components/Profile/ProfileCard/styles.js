/* -- mui -- */
import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  /* Header content */
  card: {
    minHeight: 200,
    position: 'relative',
    overflow: 'visible',
  },
  title: {
    color: theme.palette.colors.steelblue,
    marginBottom: 4,
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
  subheader: {
    padding: 8,
  },
  buttonEdit: {
    position: 'absolute',
    top: 10,
    right: 10,
    cursor: 'pointer',
  },
}));
