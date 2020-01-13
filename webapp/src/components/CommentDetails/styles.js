/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    width: '100%',
  },

  content: {
    padding: '8px 38px 8px 22px',
    width: '100%',
    overflowWrap: 'break-word',
    borderRadius: '0 30px 30px 30px',
    backgroundColor: theme.palette.colors.whitesmoke,
  },
  avatar: {
    width: 28,
    height: 28,
    marginRight: theme.spacing(1),
  },
  name: {
    textTransform: 'capitalize',
  },
  username: {
    color: theme.palette.colors.steelblue,
    fontWeight: 200,
  },
  createdAt: {
    float: 'right',
  },
  body: {
    marginTop: 8,
  },
  optionMenuButton: {
    position: 'absolute',
    right: 10,
    top: 8,
  },
}));
