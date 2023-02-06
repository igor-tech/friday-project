import { createTheme } from '@mui/material'

export const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Montserrat'), url('/assets/fonts/montserrat-woff2.woff2') format('woff2'), url('/assets/fonts/montserrat-woff.woff') format('woff'), url('/assets/fonts/montserrat-ttf.ttf') format('ttf');
        }
      `,
    },
  },
})
