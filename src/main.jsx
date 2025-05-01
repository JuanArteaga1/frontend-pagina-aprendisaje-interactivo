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
import {LoginProvider} from "./context/LoginContext"
import SubirProyecto from "./pages/SubirProyecto";
import SubirPodcast from "./pages/SubirPodcast";
import NuevaCategoria from "./pages/NuevaCategoria";
import MisProyectos from "./pages/MisProyectos";
import AdministrarDocentes from "./pages/AdministracionDocente";
import MirarProyectos from "./pages/VerProyectos";
import ProyectosPorAprobar from "./pages/ProyectosAprobar";
import Fisica from "./pages/Fisica";
import IngCivil from "./pages/IngCivil";
import Matematicas from "./pages/Matematicas";
import DetalleProyecto from "./pages/DetalleProyecto";
import ActualizarProyecto from "./pages/ActualizarProyectos";
import Episodio from "./pages/Episodio";
import AyudaT from "./pages/Ayuda";
import InvestigacionDetalle from "./pages/InvestigacionDetalle";
import QuienesSomos from "./pages/quienes-somos";
import { DocenteProvider } from "./context/DocenteContext"
import { ProyectosProvider } from "./context/ProyectoContext"
import { PodcastProvider } from "./context/PodcastContext";
import { InvestigacionProvider } from "./context/InvestigacionContext";
import { CategoriaProvider } from "./context/CategoriaContext";

import { SimulacionesProvider } from "./context/SimulacionesContex";


ReactDOM.createRoot(document.getElementById("root")).render(
  <LoginProvider>
    <BrowserRouter>
    <Routes>
      
    <Route path="/SubirDocente" element={ <DocenteProvider>  <SubirDocente/> </DocenteProvider> }/>
    <Route path="/AdministrarDocente" element={<DocenteProvider> <AdministrarDocentes/> </DocenteProvider>} />

      //rutas de estudiante y visualizacion
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/simulaciones" element={<Simulaciones />} />
      <Route path="/podcast" element={<PodcastProvider><Podcast /></PodcastProvider>} />
      <Route path="/appmovil" element={<Appmovil />} />
      <Route path="/investigaciones" element={<Investigaciones />} />
      <Route path="/ayuda" element={<AyudaT />} />
      <Route path="/quienes-somos" element={<QuienesSomos />} />

      //rutas de Administrador
      <Route path="/menuadministrador" element={<MenuAdmin />} />
      <Route path="/SubirCategoria" element={<CategoriaProvider>  <NuevaCategoria/> </CategoriaProvider>} />
      <Route path="/AdministrarDocente" element={<AdministrarDocentes />} />
      <Route path="/VerProyectos" element={<MirarProyectos />} />
      <Route path="/Aprobar" element={<ProyectosPorAprobar />} />

      <Route path="/VerProyectos" element={<MirarProyectos />} />
      <Route path="/Aprobar" element={<ProyectosPorAprobar />} />

      //rutas de docentes
      <Route path="/menudocente" element={<MenuDocen />} />
      <Route path="/subir-proyecto" element={<ProyectosProvider><SubirProyecto /></ProyectosProvider>} />
      <Route path="subir-podcast" element={<PodcastProvider><SubirPodcast/></PodcastProvider>} />
      <Route path="misproyectos" element={<MisProyectos />} />
      <Route path="actualizar-proyectos" element={<ActualizarProyecto />} />
        <Route path="/subirsimulaciones" element={<SimulacionesProvider><Subirsimulaciones /></SimulacionesProvider>} />
      <Route path="/SubirInvestigaciones" element={<InvestigacionProvider><SubirInvestigaciones /></InvestigacionProvider>} />

      <Route path="/subirpodcast" element={<h1>podcast</h1>} />

      //Rutas de las categorias de HOME
      <Route path="/Fisica" element={<Fisica />} />
      <Route path="/IngCivil" element={<IngCivil />} />
      <Route path="/Matematicas" element={<Matematicas />} />
      <Route path="/detalle/:proyecto" element={<DetalleProyecto />} />
      <Route path="/investigaciones/:id" element={<InvestigacionDetalle />} />
      <Route path="/episodio/:id" element={<Episodio />} />

    </Routes>
  </BrowserRouter>
  </LoginProvider>
);