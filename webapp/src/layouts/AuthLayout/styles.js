/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import bgImage from '../../assets/images/pattern.svg';

export default makeStyles(theme => ({
  authLayout: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    margin: 'auto',
    maxWidth: 1024,
  },
  gridLeft: {
    minHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.main,
    backgroundImage: `url(${bgImage})`,
    backgroundSize: '150%',
    backgroundPosition: 'top',
    // backgroundAttachment: 'fixed',
  },
  gridRight: {
    minHeight: '100%',
    background: theme.palette.colors.white,
  },
  card: {
    display: 'flex',
    width: '100%',
    minHeight: 580,
    background: theme.palette.colors.white,
    [theme.breakpoints.down('xs')]: {
      boxShadow: 'none',
    },
  },
  cardContent: {
    height: '100%',
    width: 'fit-content',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      margin: 'auto',
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  logoWrapper: {
    width: 24,
    height: 24,
    marginBottom: theme.spacing(2),
  },
  tab: {
    color: theme.palette.colors.dark,
    borderBottom: `1.8px solid ${theme.palette.colors.greylight}`,
    minWidth: 100,
    maxWidth: 100,
  },
  tabPanel: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));
