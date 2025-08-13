import React, { useEffect } from "react";
import Navbar from "../components/Navbar"; // Componente de navegación superior
import CategoriaProyectos from "../components/CategoriaProyectos"; // Componente que muestra proyectos por categoría
import { useProyectos } from "../context/ProyectoContext"; // Hook para acceder al contexto de proyectos
import { UseSimulaciones } from "../context/SimulacionesContex";

const IngCivil = () => {
  // Obtener todos los proyectos desde el contexto
  const { Proyectos, TraerProyectos } = useProyectos();
  const { Simulaciones, TraerSimulaciones } = UseSimulaciones();
  const apiUrl = import.meta.env.VITE_RUTA1;

  useEffect(() => {
    TraerProyectos();
    TraerSimulaciones();
  }, []);


  // Obtener simulaciones cuya materia es Ing Civil
  const simulacionesIngCivil = Simulaciones
    .filter(sim => sim.materia?.nombre === "ingenieria civil")
    .map(sim => ({
      nombre: sim.nombre_proyecto,
      imagen: `${apiUrl}/uploads/${sim.urlimg?.replace(/\\/g, "/").split("uploads/")[1]}`,
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
      imagen: `${apiUrl}/uploads/${app.urlimg?.replace(/\\/g, "/").split("uploads/")[1]}`,
      tipo: "Aplicación",
      categoria: "ingenieria civil",
      autores: app.autores,
      descripcion: app.descripcion,
      _id: app._id
    }));

  return (
    <div>
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Explorando la Ingeniería Civil
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            Descubre simulaciones interactivas y aplicaciones móviles que hacen de la ingeniería civil una experiencia fascinante.
          </p>
        </div>

        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Simulaciones de Ing. Civil
          </h2>
          <CategoriaProyectos
            categoria="ingenieria civil"
            proyectos={simulacionesIngCivil}
          />
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Aplicaciones de Ing. Civil
          </h2>
          <CategoriaProyectos
            categoria="ingenieria civil"
            proyectos={aplicacionesIngCivil}
          />
        </section>

      </div>
    </div>
  );
};

export default IngCivil;
