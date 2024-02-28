import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Undian from "./pages/Undian";
import NotFound from "./pages/NotFound";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="abc" element={<Undian />} />
      <Route path="d" element={<Undian />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);
