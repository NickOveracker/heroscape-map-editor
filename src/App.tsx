import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Route, Switch } from "wouter";
import { SnackbarProvider } from 'notistack'
import Layout from './routes/Layout'
import ErrorBoundary from './ErrorBoundary'
import World from './world/World'
import { EventProvider } from './hooks/useEvent'
import './layout/index.css'
import ErrorPage from './layout/ErrorPage';
import HomePage from './layout/HomePage';

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

            {/* <Route path="/users/:name">
              {(params) => <>Hello, {params.name}!</>}
            </Route> */}
            {/* Default route in a switch */}
            <Route><ErrorPage /></Route>
          </Switch>
          <Layout>
            <ErrorBoundary>
              <World />
            </ErrorBoundary>
          </Layout>
        </SnackbarProvider>
      </EventProvider>
    </ThemeProvider>
  )
}

export default App
