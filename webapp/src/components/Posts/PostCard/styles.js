/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

export default makeStyles(theme => ({
  post: {
    '&:not(:first-child)': {
      marginTop: theme.spacing(2),
    },
  },
  postCard: {
    border: `1px solid ${theme.palette.colors.greylight}`,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  title: {
    textTransform: 'capitalize',
    marginRight: 8,
    '& + span': {
      color: theme.palette.colors.steelblue,
      fontWeight: 300,
    },
  },
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
  createdAt: {
    display: 'block',
    marginTop: -theme.spacing(0.5),
  },
  cardAction: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: `1px solid ${theme.palette.colors.greylight}`,
  },

  commentCount: {
    marginLeft: 10,
    color: theme.palette.colors.steelblue,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));
