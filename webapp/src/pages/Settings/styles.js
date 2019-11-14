/* -- mui -- */
import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  settingsPage: {
    minHeight: 'calc(100vh - 50px)',
    background: theme.palette.colors.white,
    padding: '60px 22px',
  },

  tabs: {
    [theme.breakpoints.up('sm')]: {
      height: 400,
      borderRight: `2px solid ${theme.palette.colors.greylight}`,
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
