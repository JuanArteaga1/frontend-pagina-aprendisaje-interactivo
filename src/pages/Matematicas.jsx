import React from "react";
import Navbar from "../components/Navbar"; // Componente de navegación principal
import CategoriaProyectos from "../components/CategoriaProyectos"; // Componente para mostrar una categoría de proyectos
import { useProyectos } from "../context/ProyectoContext"; // Importa el hook del contexto para acceder a los proyectos

const Matematicas = () => {
  const { proyectos } = useProyectos(); // Usamos el contexto para acceder a todos los proyectos disponibles

  // Filtrar los proyectos que son de tipo "Aplicacion Movil"
  const proyectosAplicaciones = (proyectos || []).filter(p => p.tipo === "Aplicacion Movil");

  // Filtrar los proyectos que son de tipo "Simulacion"
  const proyectosSimulaciones = (proyectos || []).filter(p => p.tipo === "Simulacion");

  return (
    <div>
      {/* Barra de navegación superior */}
      <Navbar />
      
      {/* Sección de simulaciones relacionadas con Matemáticas */}
      <CategoriaProyectos 
        titulo="Simulaciones de Matemáticas" 
        categoria="Matemáticas" 
        proyectos={proyectosSimulaciones} // Se pasan solo los proyectos de simulaciones
      />

      {/* Sección de aplicaciones móviles relacionadas con Matemáticas */}
      <CategoriaProyectos 
        titulo="Aplicaciones Móviles de Matemáticas" 
        categoria="Matemáticas" 
        proyectos={proyectosAplicaciones} // Se pasan solo los proyectos de aplicaciones móviles
      />
    </div>
  );
};

export default Matematicas;
