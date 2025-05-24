import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoriaProyectos = ({ titulo, categoria, proyectos }) => {
    const navigate = useNavigate();
    const [busqueda, setBusqueda] = useState("");

    const goToDetalle = (proyecto) => {
        if (proyecto.tipo === "Simulación") {
            navigate(`/detalle-simulacion/${proyecto._id}`);
        } else {
            navigate(`/detalle/${proyecto._id}`);
        }
    };

    const items = proyectos || [];

    // Filtrar por búsqueda local (solo dentro de esta categoría)
    const filtrados = items.filter((proyecto) =>
        proyecto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        (proyecto.descripcion && proyecto.descripcion.toLowerCase().includes(busqueda.toLowerCase())) ||
        (proyecto.autores && proyecto.autores.toString().toLowerCase().includes(busqueda.toLowerCase()))
    );

    return (
        <div className="categoria">

            {/* Barra de búsqueda individual por categoría */}
            <div className="mb-6 max-w-md">
                <div className="relative">
                    {/* Icono de búsqueda */}
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>

                    {/* Input de búsqueda */}
                    <input
                        type="text"
                        placeholder="Buscar en esta categoría..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                    />

                    {/* Botón para limpiar búsqueda (opcional) */}
                    {busqueda && (
                        <button
                            onClick={() => setBusqueda("")}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            <svg
                                className="h-5 w-5 text-gray-400 hover:text-gray-600"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            <h2>{titulo}</h2>

            <div className="cards-container">
                {filtrados.length > 0 ? (
                    filtrados.map((proyecto, i) => (
                        <div className="card" key={i}>
                            <div className="card-inner">
                                <div className="card-front">
                                    <img
                                        src={proyecto.imagen}
                                        alt={`Imagen de ${proyecto.nombre}`}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            borderRadius: "10px"
                                        }}
                                    />
                                </div>
                                <div className="card-back">
                                    <h3><strong>{proyecto.nombre}</strong></h3>
                                    <p>{proyecto.descripcion || "Sin descripción."}</p>
                                    <p><strong>Materia:</strong> {proyecto.categoria || "Sin materia"}</p>
                                    <p><strong>Autor:</strong> {proyecto.autores || "No hay autor"}</p>
                                    <button onClick={() => goToDetalle(proyecto)}>Ver más</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay resultados disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default CategoriaProyectos;
