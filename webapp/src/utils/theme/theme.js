/* -- material-ui -- */
import { createMuiTheme } from '@material-ui/core/styles';

/* -- utils-- */
import { colors } from './colors';

export const createTheme = darkMode =>
  createMuiTheme({
    palette: {
      primary: colors.primary,
      secondary: colors.secondary,
      colors: {
        black: colors.black,
        white: colors.white,
        light: colors.light,
        grey: colors.grey,
      },
      type: darkMode ? 'dark' : 'light',
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
          fontWeight: 200,
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
