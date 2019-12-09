/* -- mui -- */
import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  page404: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 32,
  },
  title: {
    marginBottom: 10,
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.4rem',
    },
  },
  subtitle: {
    maxWidth: 320,
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    [theme.breakpoints.down('xs')]: {
      width: 200,
      height: 200,
      margin: 8,
    },
  },
}));
