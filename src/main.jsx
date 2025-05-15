import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Simulaciones from "./pages/Simulaciones";
import Podcast from "./pages/Podcast";
import Appmovil from "./pages/Appmovil"
import Investigaciones from "./pages/Investigaciones";
import Subirsimulaciones from "./pages/subir_Simulaciones";
import "./index.css";
import SubirInvestigaciones from "./pages/SubirInvestigaciones";
import MenuAdmin from "./pages/MenuAdmin";
import MenuDocen from "./pages/MenuDocen";
import SubirDocente from "./pages/SubirDocente";
import { LoginProvider } from "./context/LoginContext"
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
import { TraerProyectosProvider } from "./context/TraerProyectos";
import { SimulacionesProvider } from "./context/SimulacionesContex";
import ProtectedRote from "./ProtectedRoute";

import EditarProyecto from "./pages/EditarProyecto";
import EditarPodcast from "./pages/EditarPodcast";
import EditarInvestigacion from "./pages/EditarInvestigacion";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoginProvider>
    <BrowserRouter>
      <Routes>
      //Rutas sin autenticacion
        //rutas de estudiante y visualizacion
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/simulaciones" element={<Simulaciones />} />
        <Route path="/podcast" element={<PodcastProvider><Podcast /></PodcastProvider>} />
        <Route path="/appmovil" element={<ProyectosProvider><Appmovil /></ProyectosProvider>} />
        <Route path="/investigaciones" element={<InvestigacionProvider><Investigaciones /></InvestigacionProvider>} />
        <Route path="/ayuda" element={<AyudaT />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
      //Rutas de las categorias de HOME
        <Route path="/Fisica" element={<ProyectosProvider><Fisica /></ProyectosProvider>} />
        <Route path="/IngCivil" element={<ProyectosProvider><IngCivil /></ProyectosProvider>} />
        <Route path="/Matematicas" element={<ProyectosProvider><Matematicas /></ProyectosProvider>} />
        <Route path="/detalle/:id" element={<ProyectosProvider><DetalleProyecto /></ProyectosProvider>} />
        <Route path="/investigaciones/:id" element={<TraerProyectosProvider><InvestigacionDetalle /></TraerProyectosProvider>} />

        <Route path="/episodio/:id" element={<Episodio />} />


      //Rutas con autenticacion
        <Route element={<ProtectedRote />}>
      //rutas de Administrador
          <Route path="/menuadministrador" element={<MenuAdmin />} />
          <Route path="/SubirCategoria" element={<CategoriaProvider>  <NuevaCategoria /> </CategoriaProvider>} />
          <Route path="/VerProyectos" element={<TraerProyectosProvider><MirarProyectos /></TraerProyectosProvider>} />
          <Route path="/Aprobar" element={<ProyectosPorAprobar />} />
          <Route path="/AdministrarDocente" element={<DocenteProvider> <AdministrarDocentes /> </DocenteProvider>} />
      //rutas de docentes
          <Route path="/menudocente" element={<MenuDocen />} />
          <Route path="/subir-proyecto" element={<ProyectosProvider><SubirProyecto /></ProyectosProvider>} />
          <Route path="misproyectos" element={<TraerProyectosProvider><MisProyectos /></TraerProyectosProvider>} />
          <Route path="actualizar-proyectos" element={<ActualizarProyecto />} />
          <Route path="/subirsimulaciones" element={<SimulacionesProvider><Subirsimulaciones /></SimulacionesProvider>} />
          <Route path="/SubirInvestigaciones" element={<InvestigacionProvider><SubirInvestigaciones /></InvestigacionProvider>} />
          <Route path="/SubirDocente" element={<DocenteProvider>  <SubirDocente /> </DocenteProvider>} />
          <Route path="subir-podcast" element={<PodcastProvider><SubirPodcast /></PodcastProvider>} />

        //Ruta para editar proyecto
        <Route path="/editar-proyecto/:id" element={<ProyectosProvider><EditarProyecto /></ProyectosProvider>} />
        <Route path="/editar-podcast/:id" element={<PodcastProvider><EditarPodcast /></PodcastProvider>} />
        <Route path="/editar-investigacion/:id" element={<InvestigacionProvider><EditarInvestigacion /></InvestigacionProvider>} />

        </Route>

      </Routes>
    </BrowserRouter>
  </LoginProvider>
);