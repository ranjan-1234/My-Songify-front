import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom"; // ✅ Import BrowserRouter for routing

// Create React root
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the application
root.render(
  <React.StrictMode>
    {/* ✅ Wrapping App inside BrowserRouter to enable React Router */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// For measuring performance (optional)
reportWebVitals();
