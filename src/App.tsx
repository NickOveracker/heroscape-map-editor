import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Route, Switch } from "wouter";
import { SnackbarProvider } from 'notistack'
import * as Sentry from "@sentry/react";

import { EventProvider } from './hooks/useEvent'
import ErrorPage from './layout/ErrorPage';
import './layout/index.css'
import { ROUTES } from './ROUTES';
import HomePage from './layout/HomePage';
import PrintingApp from './PrintingApp';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', 'Helvetica', 'Arial', 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"].join(','),
    // button: {
    // fontSize: 16,
    // fontWeight: 600,
    // },
  },
})
// const RootPage = () => {
//   return (
//     <Redirect to={ROUTES.heroscapeHome} />
//   )
// }
const RootPage = () => {
  return (
    <PrintingApp />
  )
}
const App = () => {
  return (
    <Sentry.ErrorBoundary fallback={ErrorPage} showDialog>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <EventProvider>
          <SnackbarProvider
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            maxSnack={3}
            autoHideDuration={3000}
          >
            <Switch>
              <Route path={ROUTES.root} component={RootPage} />
              <Route path={`${ROUTES.heroscapeHome}`} component={HomePage} />

              {/* Default route in a switch */}
              <Route><ErrorPage /></Route>
            </Switch>
          </SnackbarProvider>
        </EventProvider>
      </ThemeProvider>
    </Sentry.ErrorBoundary>
  )
}

export default App
