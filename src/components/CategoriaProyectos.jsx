import React from "react";
import { useNavigate } from "react-router-dom";

const CategoriaProyectos = ({ titulo, categoria, proyectos }) => {
    const navigate = useNavigate();
    const goToDetalle = (proyecto) => {
        navigate(`/detalle/${proyecto.nombre}`);
    };

    const items = proyectos[categoria] || [];

    return (
        <div className="categoria">
            <h2>{titulo}</h2>
            <div className="cards-container">
                {items.map((proyecto, i) => (
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
                                <h3>{proyecto.nombre}</h3>
                                <button onClick={() => goToDetalle(proyecto)}>Ver más</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoriaProyectos;
