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
      MuiButton: {
        root: {
          color: colors.light,
          fontWeight: 200,
          textTransform: 'none',
          borderRadius: 2,
        },
        text: {
          '&:hover': {
            background: 'transparent',
          },
        },
      },
    },
  });
