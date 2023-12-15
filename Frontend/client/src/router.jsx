import {Navigate, createBrowserRouter} from "react-router-dom";


//guest layout
import GuestLayout from "./Layouts/GuestLayout";
import RegisterNew from "./pages/RegisterNew";
import LoginNew from "./pages/LoginNew";
import PwResetReqest from "./pages/PwResetReqest";
import ResetPassword from "./pages/ResetPassword";
import PwResetCheck from "./pages/PwResetCheck";

//default layout
import DefaultLayout from "./Layouts/DefaultLayout";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import Products from './pages/Products';
import Invoice from './pages/Invoice';
import Customers from './pages/Customers';
import Suplyer from './pages/Suplyer';
import Account from './pages/Account';


//others
import NotFound from "./pages/Notfound";
import UpdateProduct from "./pages/UpdateProduct";







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
            {
                path: '/account',
                element: <Account />
            },
            {
                path:'/customers',
                element: <Customers />
            },
            {
                path:'/invoice',
                element: <Invoice />
            },
            {
                path: '/products',
                element:<Products />
            },
            {
                path: '/suplyers',
                element: <Suplyer />
            },
            {
                path:'/add_product',
                element:<AddProduct />
            },
            {
                path:'/update_product',
                element:<UpdateProduct />
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children:[
            {
                path: '/register',
                element: <RegisterNew />
            },
            {
                path: '/login',
                element:<LoginNew />
            },
            {
                path:'/Password_reset_request',
                element:<PwResetReqest />
            },
            {
                path:'/reset_password',
                element:<ResetPassword />
            },
            {
                path:'password_token_check',
                element:<PwResetCheck />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }


]);

export default router;