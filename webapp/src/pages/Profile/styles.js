/* -- mui -- */
import { makeStyles } from '@material-ui/core';
import bgImage from '../../assets/images/pattern.svg';

export default makeStyles(theme => ({
  grid: {
    padding: `${theme.spacing(8)}px 0px`,
  },
  cover: {
    minWidth: '100%',
    height: 160,
    backgroundColor: theme.palette.primary.light,
    backgroundImage: `url(${bgImage})`,
    backgroundSize: '40%',
    backgroundPosition: 'center',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      height: 120,
    },
  },
  coverContent: {
    position: 'absolute',
    bottom: -25,
    maxWidth: 320,
    width: 320,
    left: '10%',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      left: 0,
      display: 'flex',
      justifyContent: 'center',
    },
  },
  coverTitle: {
    marginLeft: 20,
    fontSize: 28,
    color: theme.palette.colors.white,
    textTransform: 'capitalize',
  },
  coverAvatar: {
    height: 120,
    width: 120,
    border: `4px solid ${theme.palette.colors.white}`,
    backgroundColor: theme.palette.colors.greylight,
    [theme.breakpoints.down('xs')]: {
      width: 90,
      height: 90,
      border: `2px solid ${theme.palette.colors.white}`,
    },
  },
}));
