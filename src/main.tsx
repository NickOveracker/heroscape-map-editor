import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import ErrorPage from './error-page'
import { ROUTES } from './routes/ROUTES'
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})
const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.home,
        element: <div>Outlet1?</div>
      },
    ],
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
