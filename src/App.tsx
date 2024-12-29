import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Route, Switch } from "wouter";
import { SnackbarProvider } from 'notistack'
import { EventProvider } from './hooks/useEvent'
import ErrorPage from './layout/ErrorPage';
import HomePage from './layout/HomePage';
import './layout/index.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const App = () => {
  return (
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
  )
}

export default App
