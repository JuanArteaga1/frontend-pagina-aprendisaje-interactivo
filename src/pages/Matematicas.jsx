import React from "react";
import Navbar from "../components/Navbar";
import CategoriaProyectos from "../components/CategoriaProyectos";
import { proyectosSimulaciones } from "../pages/Simulaciones"; // Importa los proyectos de simulaciones
import { proyectosAplicaciones } from "../pages/Appmovil"; // Importa los proyectos de aplicaciones

const Matematicas = () => {
  return (
    <div>
      <Navbar />
      
      {/* Sección de Simulaciones de Matemáticas */}
      <CategoriaProyectos 
        titulo="Simulaciones de Matemáticas" 
        categoria="Matemáticas" 
        proyectos={proyectosSimulaciones} // Usamos los proyectos importados de Simulaciones
      />

      {/* Sección de Aplicaciones Móviles de Matemáticas */}
      <CategoriaProyectos 
        titulo="Aplicaciones Móviles de Matemáticas" 
        categoria="Matemáticas" 
        proyectos={proyectosAplicaciones} // Usamos los proyectos importados de Aplicaciones
      />
    </div>
  );
};

export default Matematicas;
