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
        black: colors.black,
        white: colors.white,
        whitesmoke: colors.whitesmoke,
        dark: colors.dark,
        grey: colors.grey,
        greylight: colors.greylight,
        lightsteelblue: colors.lightsteelblue,
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
          fontWeight: 400,
          textTransform: 'none',
          borderRadius: 1,
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
        },
      },
    },
  });
