import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Simulaciones from "./pages/Simulaciones";
import Podcast from "./pages/Podcast";
import Appmovil from "./pages/appmovil";
import Investigaciones from "./pages/investigaciones";
import Subirsimulaciones from "./pages/subir_Simulaciones";
import "./index.css";
import SubirInvestigaciones from "./pages/SubirInvestigaciones";
import MenuAdmin from "./pages/MenuAdmin";
import MenuDocen from "./pages/MenuDocen";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>

      //rutas de estudiante y visualizacion
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/simulaciones" element={<Simulaciones />} />
      <Route path="/podcast" element={<Podcast />} />
      <Route path="/appmovil" element={<Appmovil />} />
      <Route path="/investigaciones" element={<Investigaciones />} />

      //rutas de docentes
      <Route path="/menuadministrador" element={<MenuAdmin />} />

      //rutas de docentes
      <Route path="/menudocente" element={<MenuDocen />} />


      //rutas de carga de elementos 
      <Route path="/subirsimulaciones" element={<Subirsimulaciones />} />
      <Route path="/SubirInvestigaciones" element={<SubirInvestigaciones />} />
      <Route path="/subirproyectos" element={<h1>proyectos</h1>} />
      <Route path="/subirpodcast" element={<h1>podcast</h1>} />



    </Routes>
  </BrowserRouter>
);