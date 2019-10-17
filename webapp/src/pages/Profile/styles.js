/* -- mui -- */
import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  paper: {
    marginBottom: 30,
    flexGrow: 1,
    backgroundColor: theme.palette.colors.white,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.colors.greylight}`,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 30,
    },
  },

  tab: {
    minWidth: 80,
    '& span': {
      flexDirection: 'row',
      '& svg': {
        marginRight: 4,
      },
    },
    '&:last-child': {
      marginLeft: 50,
    },
  },
}));
