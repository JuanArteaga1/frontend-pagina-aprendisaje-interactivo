import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/simulaciones" element={<Simulaciones />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}