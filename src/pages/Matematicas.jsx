import React, { useEffect } from "react";
import Navbar from "../components/Navbar"; // Componente de navegación principal
import CategoriaProyectos from "../components/CategoriaProyectos"; // Componente para mostrar una categoría de proyectos
import { useProyectos } from "../context/ProyectoContext"; // Importa el hook del contexto para acceder a los proyectos
import { UseSimulaciones } from "../context/SimulacionesContex";

const Matematicas = () => {
  const { Proyectos, TraerProyectos } = useProyectos();
  const { Simulaciones, TraerSimulaciones } = UseSimulaciones();

  useEffect(() => {
    TraerProyectos();
    TraerSimulaciones();
  }, []);


  const simulacionesMatematicas = Simulaciones
    .filter(sim => sim.materia?.nombre === "Matematicas")
    .map(sim => ({
      nombre: sim.nombre_proyecto,
      imagen: `http://localhost:3000/uploads/${sim.urlimg?.replace(/\\/g, "/").split("uploads/")[1]}`,
      tipo: "Simulación",
      categoria: "Matematicas",
      autores: sim.autores,
      descripcion: sim.descripcion,
      _id: sim._id
    }));

  const aplicacionesMatematicas = Proyectos
    .filter(app => app.materia?.nombre === "Matematicas")
    .map(app => ({
      nombre: app.nombre_proyecto,
      imagen: `http://localhost:3000/uploads/${app.urlimg?.replace(/\\/g, "/").split("uploads/")[1]}`,
      tipo: "Aplicación",
      categoria: "Matematicas",
      autores: app.autores,
      descripcion: app.descripcion,
      _id: app._id
    }));



  return (
    <div>
      {/* Barra de navegación superior */}
      <Navbar />

      <div className="contenido-proyectos">
        <CategoriaProyectos
          titulo="Simulaciones de Matematicas"
          categoria="Matematicas"
          proyectos={simulacionesMatematicas}
        />


        <CategoriaProyectos
          titulo="Aplicaciones de Matematicas"
          categoria="Matematicas"
          proyectos={aplicacionesMatematicas}
        />

      </div>
    </div>
  );
};

export default Matematicas;
