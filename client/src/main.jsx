import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";

import ContentWrapper from "./utils/ContentWrapper.jsx";
import router from "./utils/Routes.jsx";
import { UserProvider } from "./context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <ContentWrapper>
        <RouterProvider router={router} />
      </ContentWrapper>
    </UserProvider>
  </React.StrictMode>
);
