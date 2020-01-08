/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  card: {
    '&:not(:first-child)': {
      marginTop: theme.spacing(2),
    },
  },
  cardContent: {
    paddingTop: 0,
  },

  avatar: {
    width: 40,
    height: 40,
  },
  name: {
    textTransform: 'capitalize',
  },
  username: { color: theme.palette.colors.steelblue, fontWeight: 200 },
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
