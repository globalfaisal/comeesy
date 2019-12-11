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
    border: '1px solid #e6e6e6',
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
  createdAt: {
    display: 'block',
    marginTop: -theme.spacing(0.5),
  },
  action: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 16,
  },
  cardAction: {
    borderTop: `1px solid ${theme.palette.colors.greylight}`,
  },
}));
