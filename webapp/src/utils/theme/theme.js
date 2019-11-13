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
        default: colors.whiteghost,
      },
      text: {
        primary: colors.textPrimary,
        secondary: colors.textSecondary,
      },
      colors: {
        ...colors.others,
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
          borderRadius: 2,
        },
        text: {
          '&:hover': {
            background: 'transparent',
          },
        },
      },
      MuiCard: {
        root: {
          borderRadius: 1,
        },
      },
      MuiAvatar: {
        root: {
          border: `1px solid rgba(0,0,0, 0.05)`,
          width: 32,
          height: 32,
        },
      },
      MuiMenu: {
        paper: {
          borderRadius: 0,
        },
      },
      MuiSkeleton: {
        root: {
          backgroundColor: colors.greylight,
        },
      },
      MuiExpansionPanel: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          border: '1px solid rgba(0,0,0, 0.085)',
        },
      },
    },
  });
