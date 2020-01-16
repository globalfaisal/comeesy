/* -- mui-- */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    marginTop: 8,
    marginBottom: 8,
    display: 'flex',
    width: '100%',
  },
  avatar: {
    width: 40,
    height: 40,
    border: `2px solid ${theme.palette.colors.greylight}`,
  },
  paper: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 3,
    padding: 10,
    backgroundColor: theme.palette.colors.white,
    border: `1px solid ${theme.palette.colors.greylight}`,
    borderRadius: '3px',
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
    height: 20,
    paddingTop: 8,
    paddingRight: 22,
  },
  button: {
    padding: '0 6px',
  },
  count: {
    margin: '0 8px',
  },
}));
