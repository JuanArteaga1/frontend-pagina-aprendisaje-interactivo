import React from "react";
import Navbar from "../components/Navbar"; // Componente de navegación superior
import CategoriaProyectos from "../components/CategoriaProyectos"; // Componente que muestra proyectos por categoría
import { useProyectos } from "../context/ProyectoContext"; // Hook para acceder al contexto de proyectos

const IngCivil = () => {
  // Obtener todos los proyectos desde el contexto
  const { proyectos } = useProyectos();

  // Filtrar los proyectos que son de tipo "Aplicacion Movil"
  const proyectosAplicaciones = (proyectos || []).filter(p => p.tipo === "Aplicacion Movil");

  // Filtrar los proyectos que son de tipo "Simulacion"
  const proyectosSimulaciones = (proyectos || []).filter(p => p.tipo === "Simulacion");

  return (
    <div>
      {/* Barra de navegación */}
      <Navbar />

      {/* Sección de Simulaciones de Ingeniería Civil */}
      <CategoriaProyectos
        titulo="Simulaciones de Ingeniería Civil"
        categoria="Ingeniería Civil"
        proyectos={proyectosSimulaciones} // Pasamos solo los proyectos filtrados como simulaciones
      />

      {/* Sección de Aplicaciones Móviles de Ingeniería Civil */}
      <CategoriaProyectos
        titulo="Aplicaciones Móviles de Ingeniería Civil"
        categoria="Ingeniería Civil"
        proyectos={proyectosAplicaciones} // Pasamos solo los proyectos filtrados como aplicaciones móviles
      />
    </div>
  );
};

export default IngCivil;
