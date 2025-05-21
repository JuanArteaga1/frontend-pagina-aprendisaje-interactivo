import React, { useEffect } from "react";
import Navbar from "../components/Navbar"; // Componente de navegación superior
import CategoriaProyectos from "../components/CategoriaProyectos"; // Componente que muestra proyectos por categoría
import { useProyectos } from "../context/ProyectoContext"; // Hook para acceder al contexto de proyectos
import { UseSimulaciones } from "../context/SimulacionesContex";

const IngCivil = () => {
  // Obtener todos los proyectos desde el contexto
  const { Proyectos, TraerProyectos } = useProyectos();
  const { Simulaciones, TraerSimulaciones } = UseSimulaciones();

  useEffect(() => {
    TraerProyectos();
    TraerSimulaciones();
  }, []);


  // Obtener simulaciones cuya materia es Ing Civil
  const simulacionesIngCivil = Simulaciones
    .filter(sim => sim.materia?.nombre === "ingenieria civil")
    .map(sim => ({
      nombre: sim.nombre_proyecto,
      imagen: `http://localhost:3000/uploads/${sim.urlimg?.replace(/\\/g, "/").split("uploads/")[1]}`,
      tipo: "Simulación",
      categoria: "ingenieria civil",
      autores: sim.autores,
      descripcion: sim.descripcion,
      _id: sim._id
    }));

  const aplicacionesIngCivil = Proyectos
    .filter(app => app.materia?.nombre === "ingenieria civil")
    .map(app => ({
      nombre: app.nombre_proyecto,
      imagen: `http://localhost:3000/uploads/${app.urlimg?.replace(/\\/g, "/").split("uploads/")[1]}`,
      tipo: "Aplicación",
      categoria: "ingenieria civil",
      autores: app.autores,
      descripcion: app.descripcion,
      _id: app._id
    }));

  return (
    <div>
      <Navbar />

      <div className="contenido-proyectos">
        <CategoriaProyectos
          titulo="Simulaciones de Ing Civil"
          categoria="ingenieria civil"
          proyectos={simulacionesIngCivil}
        />


        <CategoriaProyectos
          titulo="Aplicaciones de Ing Civil"
          categoria="ingenieria civil"
          proyectos={aplicacionesIngCivil}
        />

      </div>
    </div>
  );
};

export default IngCivil;
