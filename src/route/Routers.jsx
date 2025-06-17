import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login"
import SignUp from "../pages/Signup";
import Wrapper from "../layout/Wrapper";
import Products from "../pages/Products";
import Profile from "../pages/Profile";
import AddProduct from "../pages/AddProduct";
import NotFoundPage from "../pages/NotFoundPage";

export const Routers = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/signup",
        element: <SignUp />
    },
    {
        path: "/admin",
        element: <Wrapper />,
        children: [
            {
                path: "products",
                element: <Products />
            },
            {
                path: "product/add",
                element: <AddProduct />
            },
            {
                path: "profile",
                element: <Profile />
            },
        ]
    },
    {
        path: "*",
        element: <NotFoundPage />
    }
])