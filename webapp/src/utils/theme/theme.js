/* -- material-ui -- */
import { createMuiTheme } from '@material-ui/core/styles';

/* -- utils-- */
import { colors } from './colors';

export const createTheme = darkMode =>
  createMuiTheme({
    palette: {
      primary: colors.primary,
      secondary: colors.secondary,
      colors: colors.colors,
      type: darkMode ? 'dark' : 'light',
    },
    typography: {
      useNextVariants: true,
    },
  });
