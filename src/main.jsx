import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/dynamic-theme.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import LanguageProvider from "./Context/LanguageContext";
import { UserProvider } from "./Context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </LanguageProvider>
  </React.StrictMode>,
);
