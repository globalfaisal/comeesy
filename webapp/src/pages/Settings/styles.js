/* -- mui -- */
import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  root: {
    minHeight: 'calc(100vh - 50px)',
    background: theme.palette.colors.white,
    padding: `${theme.spacing(10)}px 0px`,
  },
  tabs: {
    [theme.breakpoints.up('sm')]: {
      minHeight: '300px',
      borderRight: `1.8px solid ${theme.palette.colors.greylight}`,
    },
  },
  tab: {
    [theme.breakpoints.down('xs')]: {
      borderRight: '1px solid transparent',
      borderBottom: `1.8px solid ${theme.palette.colors.greylight}`,
    },
  },
}));
