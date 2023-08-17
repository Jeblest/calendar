import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { DateProvider } from "./context/DateContext.jsx";
import { GoalProvider } from "./context/GoalContext.jsx";
import { CalendarProvider } from "./context/CalendarContext.jsx";

const router = createBrowserRouter([
  {
    path: "/calendar",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoalProvider>
      <CalendarProvider>
        <DateProvider>
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        </DateProvider>
      </CalendarProvider>
    </GoalProvider>
  </React.StrictMode>
);
