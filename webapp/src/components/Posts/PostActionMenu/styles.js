/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  menuItem: {
    minHeight: 20,
    '& > .MuiSvgIcon-root': {
      color: theme.palette.colors.steelblue,
    },
    '& > .MuiTypography-root': {
      marginLeft: 8,
      color: theme.palette.colors.steelblue,
    },
  },
}));
