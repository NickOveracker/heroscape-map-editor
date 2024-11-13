import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import Layout from './routes/layout'
import ErrorPage from './layout/error-page'
import World from './world/World'
import { ROUTES } from './routes/ROUTES'
import './layout/index.css'

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
    ]);
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    )
}

export default App