import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { UseSimulaciones } from "../context/SimulacionesContex";

const Simulaciones = () => {
    const [seccionActual] = useState("Simulaciones");
    const navigate = useNavigate();
    const { Simulaciones, TraerSimulaciones } = UseSimulaciones();

    useEffect(() => {
        TraerSimulaciones();
    }, []);

    // Filtrar solo los proyectos que pertenezcan a la sección "Simulaciones"
    const simulacionesOrdenadas = useMemo(() => {
        return [...Simulaciones].sort(
            (a, b) => new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion)
        );
    }, [Simulaciones]);


    // Ordenar por fecha y agrupar por materia
    const simulacionesAgrupadas = simulacionesOrdenadas
        .sort((a, b) => new Date(b.fechaPublicacion) - new Date(a.fechaPublicacion))
        .reduce((acc, simulaciones) => {
            const categoria = simulaciones.materia?.nombre || "Sin categoría";
            if (!acc[categoria]) acc[categoria] = [];
            acc[categoria].push(simulaciones);
            return acc;
        }, {});

    return (
        <div className="simulaciones">
            <Navbar />
            <div className="imagen-seccion">
                <img src="img/DSC04973.JPG" alt="Imagen de simulaciones" />
                <h1 className="titulo-seccion">Ahora estás en: {seccionActual}</h1>
            </div>

            <div className="contenido-proyectos">
                {Object.entries(simulacionesAgrupadas).map(([categoria, items]) => (
                    <div key={categoria} className="categoria">
                        <h2 className="text-2xl">{categoria}</h2>
                        {items.length > 0 ? (
                            <div className="cards-container">
                                {items.map((simulacion, i) => {
                                    const rutaLimpia = simulacion.urlimg?.replace(/\\/g, "/");
                                    const imagenURL = `http://localhost:3000/uploads/${rutaLimpia?.split("uploads/")[1]}`;

                                    return (
                                        <div className="card" key={i}>
                                            <div className="card-inner">
                                                <div className="card-front">
                                                    <img src={imagenURL} alt={simulacion.nombre_proyecto} className="card-img" />
                                                </div>
                                                <div className="card-back">
                                                    <h3><strong>{simulacion.nombre_proyecto}</strong></h3>
                                                    <p>{simulacion.descripcion || "Sin descripción."}</p>
                                                    <p><strong>Autor:</strong> {simulacion.autores || "No hay autor"}</p>
                                                    <button onClick={() => navigate(`/detalle-simulacion/${simulacion._id}`)}>
                                                        Ver más
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        ) : (
                            <p style={{ marginLeft: '10px' }}>No hay simulaciones disponibles.</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Simulaciones;
