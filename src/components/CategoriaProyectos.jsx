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
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <input
                type="text"
                placeholder="Buscar en esta categoría..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={{
                    padding: "8px",
                    marginBottom: "20px",
                    width: "100%",
                    maxWidth: "320px",
                    borderRadius: "5px",
                    border: "1px solid #ccc"
                }}
            />
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
