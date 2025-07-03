import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Import BrowserRouter
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter> {/* ✅ Wrap the entire app with BrowserRouter */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
