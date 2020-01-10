/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    marginLeft: 12,
    marginRight: 12,
    borderLeft: `1.5px solid ${theme.palette.colors.greylight}`,
  },
  liItem: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    width: 22,
    height: 22,
    marginRight: theme.spacing(1),
  },
  header: {
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
    padding: '3px 16px 16px 32px',
  },
  extraMenuButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
}));
