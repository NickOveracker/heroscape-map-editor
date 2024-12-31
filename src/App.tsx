import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Route, Switch } from "wouter";
import { SnackbarProvider } from 'notistack'
import * as Sentry from "@sentry/react";

import { EventProvider } from './hooks/useEvent'
import ErrorPage from './layout/ErrorPage';
import HomePage from './layout/HomePage';
import './layout/index.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: ['-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', 'Helvetica', 'Arial', 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"].join(','),
    button: {
      // fontSize: 16,
      fontWeight: 600,
    },
  },
})

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
              <Route path="/" component={HomePage} />

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
