import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import CategoriaProyectos from "../components/CategoriaProyectos";
import { useProyectos } from "../context/ProyectoContext";
import { UseSimulaciones } from "../context/SimulacionesContex";
import { useMemo } from "react";

const Fisica = () => {
    const { Proyectos, TraerProyectos } = useProyectos();
    const { Simulaciones, TraerSimulaciones } = UseSimulaciones();

    useEffect(() => {
        TraerProyectos();
        TraerSimulaciones();
    }, []);

    // Obtener simulaciones cuya materia es Física
    const simulacionesFisica = useMemo(() => Simulaciones
        .filter(sim => sim.materia?.nombre === "Fisica")
        .map(sim => ({
            nombre: sim.nombre_proyecto,
            imagen: `http://localhost:3000/uploads/${sim.urlimg?.replace(/\\/g, "/").split("uploads/")[1]}`,
            tipo: "Simulación",
            categoria: "Fisica",
            autores: sim.autores,
            descripcion: sim.descripcion,
            _id: sim._id
        })), [Simulaciones]);

    // Aplicaciones con categoría Física
    const aplicacionesFisica = useMemo(() => Proyectos
        .filter(app => app.materia?.nombre === "Fisica")
        .map(app => ({
            nombre: app.nombre_proyecto,
            imagen: `http://localhost:3000/uploads/${app.urlimg?.replace(/\\/g, "/").split("uploads/")[1]}`,
            tipo: "Aplicación",
            categoria: "Fisica",
            autores: app.autores,
            descripcion: app.descripcion,
            _id: app._id
        })), [Proyectos]);
    
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container mx-auto px-4 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                        Explorando la Física
                    </h1>
                    <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
                        Descubre simulaciones interactivas y aplicaciones móviles que hacen de la física una experiencia fascinante.
                    </p>
                </div>

                {/* Sección de Simulaciones */}
                <section className="mb-20">
                    <h2 className="text-4xl font-bold text-gray-800 mb-8">
                        Simulaciones de Física
                    </h2>
                    <CategoriaProyectos
                        titulo=""
                        categoria="Fisica"
                        proyectos={simulacionesFisica}
                    />
                </section>

                {/* Sección de Aplicaciones */}
                <section className="mb-20">
                    <h2 className="text-4xl font-bold text-gray-800 mb-8">
                        Aplicaciones de Física
                    </h2>
                    <CategoriaProyectos
                        titulo=""
                        categoria="Fisica"
                        proyectos={aplicacionesFisica}
                    />
                </section>
            </div>
        </div>
    );
};

export default Fisica;