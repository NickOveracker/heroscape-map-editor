import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import Layout from './routes/layout'
import ErrorPage from './layout/error-page'
import World from './world/World'
import { ROUTES } from './routes/ROUTES'
import './layout/index.css'
import { EventProvider } from './hooks/useEvent'
import { SnackbarProvider } from 'notistack'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const App = () => {
  const router = createBrowserRouter([
    {
      path: ROUTES.home,
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: ROUTES.home,
          element: <World />,
        },
      ],
    },
  ])
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <EventProvider>
        <SnackbarProvider
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          maxSnack={3}
          autoHideDuration={3000}
        >
          <RouterProvider router={router} />
        </SnackbarProvider>
      </EventProvider>
    </ThemeProvider>
  )
}

export default App
