import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";


const AplicacionesMoviles = () => {
    const navigate = useNavigate();
    const [seccionActual, setSeccionActual] = useState("Aplicaciones Moviles");
    const proyectos = {
        categoria1: [
            { nombre: "App 1", imagen: "/img/fotoapp.png" },
            { nombre: "App 2", imagen: "/img/fotoapp.png" },
        ],
        categoria2: [
            { nombre: "App A", imagen: "/img/fotoapp.png" },
            { nombre: "App B", imagen: "/img/fotoapp.png" },
        ],
    };

    return (
        <div className="aplicaciones-moviles">
            <Navbar />
            <div className="imagen-seccion">
                <img src="img/aplicacionesportada.png" alt="" />
                <h1 className="titulo-seccion">Ahora estás en: {seccionActual}</h1>
            </div>

            <div className="contenido-proyectos">
                {Object.entries(proyectos).map(([categoria, items]) => (
                    <div key={categoria} className="categoria">
                        <h2>{categoria}</h2>
                        {items.length > 0 ? (
                            <div className="cards-container"> {/* Usamos 'cards-container' aquí */}
                                {items.map((app, i) => (
                                    <div className="card" key={i}>
                                        <div className="card-inner">
                                            <div className="card-front">
                                                <img src={app.imagen} alt={app.nombre} className="card-img" />
                                            </div>
                                            <div className="card-back">
                                                <h3>{app.nombre}</h3>
                                                <button onClick={() => navigate(`/detalle/${app.nombre}`)}>
                                                    Ver más
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        ) : (
                            <p style={{ marginLeft: '10px' }}>No hay aplicaciones disponibles.</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AplicacionesMoviles;

