import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './routes/layout'
import ErrorPage from './error-page'
import { ROUTES } from './routes/ROUTES'
import World from './world/World'

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
        <RouterProvider router={router} />
    )
}

export default App