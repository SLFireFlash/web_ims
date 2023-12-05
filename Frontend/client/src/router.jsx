import {Navigate, createBrowserRouter} from "react-router-dom";


import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/Notfound";
import DefaultLayout from "./Layouts/DefaultLayout";
import GuestLayout from "./Layouts/GuestLayout";
import LoginHelp from "./pages/LoginHelp";

const router = createBrowserRouter([

    {
        path: '/',
        element: <DefaultLayout />,
        children:[
            {
                path: '/',
                element: <Navigate to="/dashboard" />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children:[
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element:<Login />
            },
            {
                path:'/login_help',
                element:<LoginHelp />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }


]);

export default router;