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
import SubirDocente from "./pages/SubirDocente";
import NuevaCategoria from "./pages/NuevaCategoria";
import AdministrarDocentes from "./pages/AdministracionDocente";
import MirarProyectos from "./pages/VerProyectos";
import ProyectosPorAprobar from "./pages/ProyectosAprobar";

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

      //rutas de Administrador
      <Route path="/menuadministrador" element={<MenuAdmin />} />
      <Route path="/SubirCategoria" element={<NuevaCategoria />} />
      <Route path="/AdministrarDocente" element={<AdministrarDocentes />} />
      <Route path="/VerProyectos" element={<MirarProyectos />} />
      <Route path="/Aprobar" element={<ProyectosPorAprobar />} />

      




      //rutas de docentes
      <Route path="/menudocente" element={<MenuDocen />} />
      <Route path="/SubirDocente" element={<SubirDocente />} />



      //rutas de carga de elementos 
      <Route path="/subirsimulaciones" element={<Subirsimulaciones />} />
      <Route path="/SubirInvestigaciones" element={<SubirInvestigaciones />} />
      <Route path="/subirproyectos" element={<h1>proyectos</h1>} />
      <Route path="/subirpodcast" element={<h1>podcast</h1>} />



    </Routes>
  </BrowserRouter>
);