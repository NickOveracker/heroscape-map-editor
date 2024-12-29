import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import Layout from './routes/Layout'
import ErrorBoundary from './ErrorBoundary'
import World from './world/World'
import { EventProvider } from './hooks/useEvent'
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
