import React from "react";
import Navbar from "../components/Navbar";
import CategoriaProyectos from "../components/CategoriaProyectos";
import { proyectosSimulaciones } from "../pages/Simulaciones"; // Importa los proyectos de simulaciones
import { proyectosAplicaciones } from "../pages/Appmovil"; // Importa los proyectos de aplicaciones

const IngCivil = () => {
  return (
    <div>
      <Navbar />
      
      {/* Sección de Simulaciones de Ingeniería Civil */}
      <CategoriaProyectos 
        titulo="Simulaciones de Ingeniería Civil" 
        categoria="Ingeniería Civil" 
        proyectos={proyectosSimulaciones} // Usamos los proyectos importados de Simulaciones
      />

      {/* Sección de Aplicaciones Móviles de Ingeniería Civil */}
      <CategoriaProyectos 
        titulo="Aplicaciones Móviles de Ingeniería Civil" 
        categoria="Ingeniería Civil" 
        proyectos={proyectosAplicaciones} // Usamos los proyectos importados de Aplicaciones
      />
    </div>
  );
};

export default IngCivil;
