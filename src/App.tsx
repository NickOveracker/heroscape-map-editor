import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import Layout from './routes/layout'
import ErrorPage from './layout/error-page'
import World from './world/World'
import { ROUTES } from './routes/ROUTES'
import './layout/index.css'
import { EventProvider } from './hooks/useEvent'

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
                    element: <World />
                },
            ],
        },
    ], {
        future: {
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionErrorRevalidation: true,
        }
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <EventProvider>
                <RouterProvider router={router} future={{
                    v7_startTransition: true
                }} />
            </EventProvider>
        </ThemeProvider>
    )
}

export default App