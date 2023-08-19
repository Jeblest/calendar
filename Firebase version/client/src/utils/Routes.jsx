import App from "../pages/App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { createBrowserRouter } from "react-router-dom";

export const ROOT = "/calendar";
export const LOGIN = "/calendar/login";
export const REGISTER = "/calendar/register";

const router =  createBrowserRouter([
    {path:ROOT ,element: <App />},
    {path:LOGIN ,element: <Login />},
    {path:REGISTER ,element: <Register />}
])

export default router;