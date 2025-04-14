import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Simulaciones = () => {
    const [seccionActual] = useState("Simulaciones");
    const navigate = useNavigate();

    const proyectos = {
        Fisica: [
            { nombre: "Simulación 1", imagen: "/img/fotoapp.png" },
            { nombre: "Simulación 2", imagen: "/img/fotoapp.png" },
            { nombre: "Simulación 3", imagen: "/img/fotoapp.png" },
            { nombre: "Simulación 4", imagen: "/img/fotoapp.png" }
        ],
        Matemáticas: [
            { nombre: "Simulación A", imagen: "/img/fotoapp.png" },
            { nombre: "Simulación B", imagen: "/img/fotoapp.png" },
            { nombre: "Simulación C", imagen: "/img/fotoapp.png" }
        ],
        "Ingeniería Civil": []
    };

    const irADetalle = (proyecto) => {
        const nombreCodificado = encodeURIComponent(proyecto);
        navigate(`/detalle/${nombreCodificado}`);
    };

    return (
        <div className="simulaciones">
            <Navbar />
            <div className="imagen-seccion">
                <img src="img/simulacionesportada.png" alt="Imagen de simulaciones" />
                <h1 className="titulo-seccion">Ahora estás en: {seccionActual}</h1>
            </div>

            <div className="contenido-proyectos">
                {Object.entries(proyectos).map(([categoria, items]) => (
                    <div key={categoria} className="categoria">
                        <h2>{categoria}</h2>
                        {items.length > 0 ? (
                            <div className="cards-container">
                                {items.map((proyecto, i) => (
                                    <div className="card" key={i}>
                                        <div className="card-inner">
                                            <div className="card-front">
                                                <img src={proyecto.imagen} className="card-img" />
                                            </div>
                                            <div className="card-back">
                                                <h3>{proyecto.nombre}</h3>
                                                <button onClick={() => irADetalle(proyecto.nombre)}>
                                                    Ver más
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
