/* -- mui-- */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  commentBox: {
    marginTop: 8,
    marginBottom: 8,
    display: 'flex',
  },
  avatar: {
    width: 36,
    height: 36,
    border: `2px solid ${theme.palette.colors.greylight}`,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginLeft: 8,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.colors.white,
    border: `1px solid ${theme.palette.colors.greylight}`,
  },
  input: {
    padding: '6px 8px',
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  action: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 8,
  },
  button: {
    padding: '0 6px',
    minWidth: 0,
  },
  count: {
    margin: '0 8px',
  },
  errorMsg: {
    margin: '0 4px',
    color: theme.palette.colors.red,
  },
}));
