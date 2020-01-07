/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

export default makeStyles(theme => ({
  commentIconBtn: {
    padding: 6,
    marginRight: 6,
    '&:hover': {
      backgroundColor: blue[50],
    },
  },
  commentIcon: {
    color: 'transparent',
    strokeWidth: 1,
    stroke: theme.palette.colors.steelblue,
  },
}));
