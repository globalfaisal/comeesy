/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

export default makeStyles(theme => ({
  commentBtn: {
    color: theme.palette.colors.steelblue,
  },
  commentIcon: {
    color: 'transparent',
    strokeWidth: 2,
    stroke: theme.palette.colors.steelblue,
  },
}));
