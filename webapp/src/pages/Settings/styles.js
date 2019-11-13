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
      height: '100%',
      borderRight: `1.8px solid ${theme.palette.colors.greylight}`,
    },
  },
  tab: {
    '& > .MuiTab-wrapper': {
      alignItems: 'flex-start',
    },
    '&[aria-selected=true]': {
      background: theme.palette.colors.greylight,
    },

    [theme.breakpoints.down('xs')]: {
      borderRight: '1px solid transparent',
      borderBottom: `1.8px solid ${theme.palette.colors.greylight}`,
      '& > .MuiTab-wrapper': {
        alignItems: 'center',
      },
    },
  },
}));
