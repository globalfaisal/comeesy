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
    paddingBottom: 6,
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
    display: 'flex',
    alignItems: 'center',
    marginTop: -4,
    fontSize: '0.75rem',
    '& > span': {
      marginLeft: 4,
      lineHeight: 0,
      letterSpacing: -0.5,
    },
  },
  cardAction: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 50,
    borderTop: `1px solid ${theme.palette.colors.greylight}`,
    '& > button, & > a': {
      flex: 1,
    },
  },
  count: {
    paddingTop: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '& span.dot': {
      margin: '0 8px',
    },
  },
  commentCount: {
    color: theme.palette.colors.steelblue,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));
