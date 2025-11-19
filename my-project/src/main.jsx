import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import './index.css'
import SmoothScrollProvider from "./components/SmoothScrollProvider";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <SmoothScrollProvider>
      <App />
      </SmoothScrollProvider>
    </AuthProvider>
  </BrowserRouter>
);