/* -- material-ui -- */
import { createMuiTheme } from '@material-ui/core/styles';

/* -- utils-- */
import { colors } from './colors';

export default () =>
  createMuiTheme({
    palette: {
      type: 'light',
      primary: colors.primary,
      secondary: colors.secondary,
      background: {
        default: colors.defaultBackground,
      },
      text: {
        primary: colors.textPrimary,
        secondary: colors.textSecondary,
      },
      colors: {
        ...colors.others,
        defaultBackground: colors.defaultBackground,
      },
    },
    typography: {
      useNextVariants: true,
    },
    overrides: {
      MuiAppBar: {
        root: {
          height: 50,
        },
      },

      MuiButton: {
        root: {
          textTransform: 'none',
          borderRadius: 3,
        },
        text: {
          '&:hover': {
            background: 'transparent',
          },
        },
      },
      MuiCard: {
        root: {
          borderRadius: 3,
          '&.MuiPaper-elevation1': {
            boxShadow: 'none',
            border: '1px solid #e6e6e6',
          },
        },
      },
      MuiAvatar: {
        root: {
          border: '1px solid rgba(0,0,0, 0.05)',
          backgroundColor: 'rgba(0,0,0, 0.05)',
          width: 32,
          height: 32,
        },
      },
      MuiList: {
        root: {
          width: '100%',
        },
      },
      MuiMenu: {
        paper: {
          minWidth: 100,
          marginTop: -1,
          borderRadius: 0,
          border: '1px solid #e6e6e6',
        },
      },
      MuiSkeleton: {
        root: {
          backgroundColor: colors.others.greylight,
        },
      },
      MuiExpansionPanel: {
        root: {
          borderRadius: 3,
          boxShadow: 'none',
          border: '1px solid rgba(0,0,0, 0.085)',
          '&:before': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  });
