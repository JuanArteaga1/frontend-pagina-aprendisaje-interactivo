import React, { useEffect } from "react";
import Navbar from "../components/Navbar"; // Componente de navegación principal
import CategoriaProyectos from "../components/CategoriaProyectos"; // Componente para mostrar una categoría de proyectos
import { useProyectos } from "../context/ProyectoContext"; // Importa el hook del contexto para acceder a los proyectos
import { UseSimulaciones } from "../context/SimulacionesContex";

const Matematicas = () => {
  const { Proyectos, TraerProyectos } = useProyectos();
  const { Simulaciones, TraerSimulaciones } = UseSimulaciones();
  const apiUrl = import.meta.env.VITE_RUTA1;

  useEffect(() => {
    TraerProyectos();
    TraerSimulaciones();
  }, []);


  const simulacionesMatematicas = Simulaciones
    .filter(sim => sim.materia?.nombre === "Matematicas")
    .map(sim => ({
      nombre: sim.nombre_proyecto,
      imagen: `${apiUrl}/uploads/${sim.urlimg?.replace(/\\/g, "/").split("uploads/")[1]}`,
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
      imagen: `${apiUrl}/uploads/${app.urlimg?.replace(/\\/g, "/").split("uploads/")[1]}`,
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
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Explorando las Matemáticas
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            Descubre simulaciones interactivas y aplicaciones móviles que hacen de matemáticas una experiencia fascinante.
          </p>
        </div>
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Simulaciones de Matemáticas
          </h2>
          <CategoriaProyectos
            categoria="Matematicas"
            proyectos={simulacionesMatematicas}
          />
        </section>
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Aplicaciones de Matemáticas
          </h2>
          <CategoriaProyectos
            categoria="Matematicas"
            proyectos={aplicacionesMatematicas}
          />
        </section>
      </div>
    </div>
  );
};

export default Matematicas;
