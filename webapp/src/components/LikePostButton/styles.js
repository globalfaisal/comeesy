/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export default makeStyles(theme => ({
  likeBtn: {
    marginRight: 10,
    color: theme.palette.colors.steelblue,
  },
  likeIconActive: {
    color: red[300],
    strokeWidth: 2,
    stroke: red[300],
    transformOrigin: 'center',
    animation: `$beat .25s ${theme.transitions.easing.easeInOut}`,
  },
  likeIconNormal: {
    color: 'transparent',
    strokeWidth: 2,
    stroke: theme.palette.colors.steelblue,
  },
  '@keyframes beat': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.5)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
}));
