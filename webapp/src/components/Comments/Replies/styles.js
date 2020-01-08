/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    marginLeft: '5%',
    marginRight: '5%',
    width: '90%',
  },
  liItem: {
    display: 'flex',
    flexDirection: 'column',
    '&:last-child': {
      borderBottom: 0,
    },
  },
  avatar: {
    width: 24,
    height: 24,
    marginRight: theme.spacing(1),
  },
  title: {
    display: 'flex',
  },
  name: {
    textTransform: 'capitalize',
  },
  username: {
    color: theme.palette.colors.steelblue,
    fontWeight: 200,
  },
  body: {
    padding: '3px 16px 16px 36px',
  },
}));
